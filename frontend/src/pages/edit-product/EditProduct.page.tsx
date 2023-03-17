import React from "react";
import { IProduct } from "../../types/global.typing";
import "./edit-product.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const EditProduct: React.FC = () => {
   const [product, setProduct] = React.useState<Partial<IProduct>>({ title: "", brand: "" });

   const redirect = useNavigate();
   const { id } = useParams();

   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setProduct({
         ...product,
         [event.target.name]: event.target.value,
      });
   };

   React.useEffect(() => {
      axios.get<IProduct>(`${baseUrl}/${id}`).then((response) =>
         setProduct({
            title: response.data.title,
            brand: response.data.brand,
         })
      );
   }, []);

   const handleSaveBtnClick = () => {
      if (product.title === "" || product.brand === "") {
         alert("Enter Values");
         return;
      }
      const data: Partial<IProduct> = {
         brand: product.brand,
         title: product.title,
      };
      axios
         .put(`${baseUrl}/${id}`, data)
         .then((resposne) => redirect("/products", { state: { message: "Product Updated Successfully" } }))
         .catch((error) => alert("Error"));
   };

   const handleBackBtnClick = () => {
      redirect("/products");
   };

   return (
      <div className="edit-product">
         <h2>Edit Product</h2>
         <TextField
            autoComplete="off"
            label="Brand"
            variant="outlined"
            name="brand"
            value={product.brand}
            onChange={changeHandler}
         />
         <TextField
            autoComplete="off"
            label="Title"
            variant="outlined"
            name="title"
            value={product.title}
            onChange={changeHandler}
         />
         <div>
            <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
               Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleBackBtnClick}>
               Back
            </Button>
         </div>
      </div>
   );
};

export default EditProduct;
