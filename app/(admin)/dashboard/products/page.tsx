import BreadcumbComponents from "../_components/BreadcumbComponents";
import ProductsTable from "../_components/ProductsTable";

export const revalidate = 0;

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <BreadcumbComponents page="Product" />
      <div className="flex flex-1 flex-col gap-4 pt-0 p-5">
        <div className="flex-1 gap-4 rounded-2xl bg-muted/100 p-6">
          <div className="bg-card rounded-xl p-5 ">
            <ProductsTable products={products} />
          </div>
        </div>
      </div>
    </>
  );
}
