import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const CartDetails = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, addInvoice } =
    useCart();
  const [completeCheckout, setCompleteCheckout] = useState(false);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    addInvoice();
    clearCart();
    setCompleteCheckout(true);
  };

  useEffect(() => {
    if (cart.length > 0 && completeCheckout) {
      setCompleteCheckout(false);
    }
  }, [cart]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Checkout
        </Typography>
        {cart.length !== 0 &&
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                padding: "2%",
                border: "1px solid black",
                borderRadius: "7px",
                boxShadow: "5px 10px rgb(65, 41, 90)",
              }}
            >
              <img src={item.images[0]} alt={item.title} width="300" />
              <div style={{ display: "grid" }}>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="h6">{item.description}$</Typography>
                <Typography variant="h4" sx={{ color: "rgb(65, 41, 90)" }}>
                  Price:{item.price}$
                </Typography>

                <Typography variant="h6">Quantity:</Typography>
                <TextField
                  type="number"
                  style={{ backgroundColor: "white", color: "black" }}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                ></TextField>
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "#3f4c6b",
                    boxShadow: "5px 10px",
                    transition: "all 0.5 ",
                  }}
                  variant="contained"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          {cart.length !== 0 && (
            <div>
              <Typography style={{ textAlign: "center" }} variant="h3">
                Total Price: {totalPrice ? totalPrice.toFixed(2) : "0.00"}$
              </Typography>
              <Button
                size="small"
                style={{ backgroundColor: "#3f4c6b" }}
                variant="contained"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          )}
          {completeCheckout && (
            <Typography style={{ textAlign: "center" }} variant="h3">
              THANK YOU FOR PURCHASING ON OUR HUMBLE STORE
              <br />
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
