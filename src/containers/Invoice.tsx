import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid2 from "@mui/material/Grid2";
import { useCart } from "../context/CartContext";

const Invoice: React.FC = () => {
  const { invoice, clearInvoice } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Invoices
      </Typography>

      {invoice.length > 0 ? (
        <div>
          {invoice.map((invoiceItems, index) => (
            <div key={index}>
              <Typography variant="h4" gutterBottom>
                Invoice {index + 1}
              </Typography>
              {invoiceItems.map((item) => (
                <Card key={item.id} style={{ marginBottom: "20px" }}>
                  <CardContent>
                    <Grid2 container spacing={2}>
                      <Grid2 size={3}>
                        <img
                          src={
                            item.images[0]?.url ||
                            "https://via.placeholder.com/150"
                          }
                          alt={item.title}
                          width={300}
                        />
                      </Grid2>
                      <Grid2 size={8}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="body1">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body1">
                          Price: ${item.price.toFixed(2)}
                        </Typography>
                        <Typography variant="h6">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={clearInvoice}
            >
              Clear Invoices
            </Button>
          </div>
        </div>
      ) : (
        <Typography variant="h6" style={{ textAlign: "center" }}>
          No invoices available.
        </Typography>
      )}
    </div>
  );
};

export default Invoice;
