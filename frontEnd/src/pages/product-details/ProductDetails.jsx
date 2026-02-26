import React, { useState, useRef } from "react";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetOneProductQuery } from "../../Redux/productsAPI";
import "./ProductDetails.css";
import DetailsThumb from "./DetailsThumb";
import Colors from "./Colors";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetails = () => {
  const { id } = useParams();
  const { selectedProductsID, selectedProducts } = useSelector(
    // @ts-ignore
    (state) => state.cart,
  );
  const { data, error, isLoading } = useGetOneProductQuery(id);
  const [index, setIndex] = useState(0);
  const myRef = useRef();
  const dispatch = useDispatch();

  const handleTab = (index) => {
    setIndex(index);
    // @ts-ignore
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  const productQuantity = (item) => {
    const productById = selectedProducts.find((itemUser) => {
      return itemUser.id === data.id;
    });
    return productById.quantity;
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={80} color="secondary" />
      </Box>
    );
  }
  if (error) {
    return <h1>There is an error...</h1>;
  }
  if (data) {
    // Always use an array for mapping

    return (
      <div className="app">
        <div className="details" key={data.id}>
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>
            <Colors colors={data.colors} />

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {/* Btn and Counter switch */}
            {selectedProductsID.includes(data.id) ? (
              <Stack
                direction="row"
                spacing={2}
                className="product-counter"
                // justifyContent={"center"}
                alignItems={"center"}
                mt={3}
              >
                <IconButton
                  sx={{ padding: "0px" }}
                  onClick={() => dispatch(increaseQuantity(data))}
                >
                  <AddIcon
                    color="primary"
                    sx={{ fontSize: "0.5 rem", width: "0.7em" }}
                  />
                </IconButton>
                <Badge
                  className="product-quantity"
                  // badgeContent={selectedProducts[index].quantity}
                  badgeContent={productQuantity(data)}
                  color="primary"
                />
                <IconButton
                  sx={{ padding: "0px" }}
                  onClick={() => dispatch(decreaseQuantity(data))}
                >
                  <RemoveIcon
                    color="primary"
                    sx={{ fontSize: "0.5 rem", width: "0.7em" }}
                  />
                </IconButton>
              </Stack>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  p: 1,
                  lineHeight: 1,
                  ml: 1,
                  mt: 2,
                }}
                onClick={() => {
                  dispatch(addToCart(data));
                }}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ProductDetails;
