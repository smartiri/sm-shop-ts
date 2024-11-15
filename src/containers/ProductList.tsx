import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import useApi from "../hooks/useApi";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProductList = () => {
  const { products, fetchProducts, deleteProduct } = useApi();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const handleClick = () => {
    navigate("/products", { state: { product_id: 0 } });
  };

  useEffect(() => {
    if (location.state) {
      fetchProducts();
    }
  }, [location.state, fetchProducts]);

  const handleDelete = (product_id: number) => {
    deleteProduct(product_id);
  };

  const handleEdit = (product_id: number) => {
    navigate("/products", { state: { product_id: product_id } });
  };

  const handleAddCart = (items: any) => {
    addToCart(items);
  };
  return (
    <div>
      <div style={{ padding: "2%" }}>
        <Button
          variant="outlined"
          sx={{ border: "1px solid green", color: "green" }}
          onClick={handleClick}
        >
          Create Product
        </Button>
        <br />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "15px",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              sx={{
                maxWidth: 345,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                alt={product.title}
                height="140"
                image={product.images[0]}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {product.description}
                </Typography>

                <Typography variant="h4" sx={{ color: "text.secondary" }}>
                  {product.price} €
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(product.id)}>
                  Edit
                </Button>
                <Button size="small" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
                <Button size="small" onClick={() => handleAddCart(product)}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <h2 style={{ textAlign: "center" }}>No products here....</h2>
        )}
      </div>
    </div>
  );
};
export default ProductList;
