import { useProductList } from "../hooks/useProductList";
import { formatCurrencyJPY } from "../utils/formatCurrencyJPY";

function HomePage() {
  const { error, isLoading, productList } = useProductList();
  if (isLoading) return <p>Loading....</p>;
  if (!!error && !isLoading && !productList?.length) return <p>Error ....</p>;
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our app!</p>
      <div>
        {productList?.map((p) => (
          <div key={p.id} style={{ display: "flex", gap: 4 }}>
            <p>{p?.name}</p>
            <p>{formatCurrencyJPY(p?.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
