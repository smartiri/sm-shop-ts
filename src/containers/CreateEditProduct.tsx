import { Controller, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useApi from "../hooks/useApi";

import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

interface ProductFormData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string;
}
const CreateEditProduct = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>();
  const location = useLocation();
  const navigate = useNavigate();
  const { product, categories, createProduct, fetchProduct, updateProduct } =
    useApi();

  useEffect(() => {
    if (location.state !== 0) {
      fetchProduct(location.state.product_id);
    }
  }, [location.state.product_id]);

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("categoryId", product.category?.id || "");
    }
  }, [product, setValue]);

  const onSubmit = (data: ProductFormData) => {
    const selectedCategory = categories.filter(
      (category) => category.id === data.categoryId
    );
    const newProduct = {
      ...data,
      category: selectedCategory[0],
      images: selectedCategory ? [selectedCategory[0].image] : "",
    };
    if (location.state.product_id > 0) {
      updateProduct(location.state.product_id, newProduct);
    } else {
      createProduct(newProduct);
    }

    reset();
    navigate("/", { state: { newProduct: newProduct } });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">
        {location.state.product_id > 0 ? "Update Product" : "Create Product"}
      </Typography>
      <div>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "5%",
            gap: "30px",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="filled"
            required
            id="standard-required"
            defaultValue={""}
            label="Name"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          ></TextField>
          <TextField
            variant="filled"
            required
            id="standard-required"
            label="Description"
            {...register("description", {
              required: "Description is required",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          ></TextField>
          <TextField
            type="number"
            variant="filled"
            required
            id="standard-required"
            label="Price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          ></TextField>
          <FormControl variant="outlined" error={!!errors.categoryId}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field: { onChange, onBlur, value = "" } }) => (
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  defaultValue=""
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map((category: any) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.categoryId && (
              <FormHelperText>{errors.categoryId.message}</FormHelperText>
            )}
          </FormControl>

          <Button variant="outlined" type="submit">
            Create/Update Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditProduct;
