import Typography from "@mui/material/Typography";
import ProductList from "./ProductList";

const Homepage = () => {
  return (
    <>
      <Typography style={{ textAlign: "center" }} variant="h3">
        Welcome to our humble shop
      </Typography>
      <ProductList />
    </>
  );
};

export default Homepage;
