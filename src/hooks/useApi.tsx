import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "https://api.escuelajs.co/api/v1";
const CAT_API_URL = "https://api.escuelajs.co/api/v1/categories";
const useApi = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<any>({});

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching products");
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${CAT_API_URL}`);
      setCategories(response.data);
      setLoading(false);
    } catch (error: any) {
      setError("Failed to fetch categories");
      setLoading(false);
    }
  };

  const fetchProduct = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };
  const createProduct = async (product: {
    title: string;
    description: string;
    price: number;
    category: object;
    images: any;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/products/`, product);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      setError("Error creating product");
    }
  };

  const updateProduct = async (
    id: number,
    updatedProduct: {
      title: string;
      description: string;
      price: number;
      category: object;
      images: any;
    }
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/products/${id}`,
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? response.data : product
        )
      );
    } catch (err) {
      setError("Error updating product");
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (err) {
      setError("Error deleting product");
    }
  };

  const exportCSV = async () => {
    try {
      const response = await axios.get("/api/products/download", {
        responseType: "blob",
      });
      const file = new Blob([response.data], { type: "text/csv" });
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(file);
      link.href = url;
      link.download = "products.csv";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Error exporting CSV");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return {
    products,
    product,
    categories,
    loading,
    error,
    createProduct,
    fetchProducts,
    fetchProduct,
    updateProduct,
    deleteProduct,
    exportCSV,
  };
};

export default useApi;
