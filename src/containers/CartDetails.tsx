import { Button, Typography } from "@mui/material";
import { useCart } from "../context/CartContext";
import "../App.css";
import { useState, useEffect } from "react";

const CartDetails = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [completeCheckout, setCompleteCheckout] = useState(false);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
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
      <div style={{ fontSize: "20px" }}>
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
                gap: "5%",
                padding: "2%",
              }}
            >
              <img src={item.images[0]} alt={item.title} width="100" />
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  style={{ backgroundColor: "white", color: "black" }}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  min="1"
                />
              </p>
              <Button
                size="small"
                style={{ backgroundColor: "#3f4c6b" }}
                variant="contained"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <h2>
            Total Price: {totalPrice.toFixed(2) ? totalPrice.toFixed(2) : 0}
          </h2>
          {cart.length !== 0 && (
            <Button
              size="small"
              style={{ backgroundColor: "#3f4c6b" }}
              variant="contained"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          )}
          {completeCheckout && (
            <h2 style={{ textAlign: "center" }}>
              THANK YOU FOR PURCHASING ON OUR HUMBLE STORE
              <br />
              <span>AND THANK YOU FOR SUPPORTING OUR SMALL BUSINESS</span>
              <br />
              <span>That's all folks.....</span>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
