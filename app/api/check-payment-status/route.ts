import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/prisma";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!); // pastikan ENV VAR benar

export async function POST(request: NextRequest) {
  const { paymentIntentId } : {paymentIntentId: string} = await request.json();

  try {
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!pi) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    if (pi.status !== "succeeded") {
      return NextResponse.json(
        { status: false, message: "Payment not successful" },
        { status: 200 }
      );
    }

    // 1) Parse metadata
    const raw = pi.metadata.productId;
    if (!raw) throw new Error("Missing productId metadata");
    let productIds: string[];
    try {
      productIds = JSON.parse(raw);
    } catch {
      throw new Error("productId metadata is not valid JSON");
    }

    const email = pi.metadata.email;
    const username = pi.metadata.username;
    if (!email || !username) throw new Error("Missing email/username metadata");

    // 2) Query produk
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
    });
    if (!products.length) throw new Error("No products found for these IDs");

    const downloadLinks = products.map((p) => p.model);

    // 4) Kirim email
    const response = await resend.emails.send({
      from: "bughats-store@bughatscreative.id",
      to: email,
      subject: "Your Purchased 3D Models",
      html: `
    <p>Hi ${username},</p>
    <p>Thanks for your purchase. Download your models here:</p>
    <ul>
      ${downloadLinks.map((url) => `<li><a href="${url}">${url}</a></li>`).join('')}
    </ul>
  `,
     
    });

    console.log(response); 
    
    return NextResponse.json({
      status: true,
      message: "Payment successful & email sent",
    });
  } catch (error) {
    if (error instanceof Error) {
      // Jika `error` adalah instance dari `Error`
      console.error("[send-email]", error.message);
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      );
    } else {
      // Jika error bukan `Error`, misalnya bisa berupa string atau tipe lainnya
      console.error("[send-email] Unknown error", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
