import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {


  try {
    const user = await currentUser();
 

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) {
    
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (!existingUser) {
      console.log("Creating new user in DB...");
      await db.user.create({
        data: {
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          email: email,
          image: user.imageUrl,
        },
      });
      console.log("User saved successfully");
    } else {
      console.log("User already exists.");
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Error saving OAuth user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
