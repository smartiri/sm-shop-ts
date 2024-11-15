import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./containers/Layout";
import Homepage from "./containers/Homepage";
import CreateEditProduct from "./containers/CreateEditProduct";
import { CartProvider } from "./context/CartContext";
import CartDetails from "./containers/CartDetails";
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<CreateEditProduct />} />
            <Route path="/products/:id" element={<CreateEditProduct />} />
            <Route
              path="*"
              element={
                <div style={{ textAlign: "center" }}>Not found! Try again!</div>
              }
            />
            <Route path="/checkout" element={<CartDetails />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
