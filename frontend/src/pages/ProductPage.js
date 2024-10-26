import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  console.log(id);
  return <div>this is product page</div>;
}

export default ProductPage;
