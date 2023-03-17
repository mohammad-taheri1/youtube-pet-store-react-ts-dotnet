import { useState, useEffect } from "react";
import "./products.scss";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { IProduct } from "../../types/global.typing";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Products: React.FC = () => {
   const [products, setProducts] = useState<IProduct[]>([]);
   const location = useLocation();
   const redirect = useNavigate();

   console.log(location);

   const fetchProductsList = async () => {
      try {
         const response = await axios.get<IProduct[]>(baseUrl);
         setProducts(response.data);
         if (location?.state) {
            Swal.fire({
               icon: "success",
               title: location?.state?.message,
            });
            redirect(location.pathname, { replace: true });
         }
      } catch (error) {
         alert("An Error Happend");
      }
   };

   useEffect(() => {
      fetchProductsList();
   }, []);

   //    console.log(products);

   const redirectToEditPage = (id: string) => {
      redirect(`/products/edit/${id}`);
   };

   const redirectToDeletePage = (id: string) => {
      redirect(`/products/delete/${id}`);
   };

   return (
      <div className="products">
         <h1>Products List</h1>
         {products.length === 0 ? (
            <h1>No Products</h1>
         ) : (
            <div className="table-wrapper">
               <table>
                  <thead>
                     <tr>
                        <th>Title</th>
                        <th>Brand</th>
                        <th>Creation Time</th>
                        <th>Update Time</th>
                        <th>Operations</th>
                     </tr>
                  </thead>
                  <tbody>
                     {products.map((product) => (
                        <tr key={product.id}>
                           <td>{product.title}</td>
                           <td>{product.brand}</td>
                           <td>{moment(product.createdAt).fromNow()}</td>
                           <td>{moment(product.updatedAt).fromNow()}</td>
                           <td>
                              <Button
                                 variant="outlined"
                                 color="warning"
                                 sx={{ mx: 3 }}
                                 onClick={() => redirectToEditPage(product.id)}
                              >
                                 <Edit />
                              </Button>
                              <Button variant="outlined" color="error" onClick={() => redirectToDeletePage(product.id)}>
                                 <Delete />
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default Products;
