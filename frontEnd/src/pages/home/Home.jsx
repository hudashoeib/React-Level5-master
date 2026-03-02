import { Box, useTheme } from "@mui/system";
import "./Home.css";

import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import { useGetproductsByNameQuery } from "../../Redux/productsAPI";

import { CircularProgress, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlice";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

// const recieveDataFromApi = [

//   {},
//   {},
//   {},
//   {},
//   {},
//   {},
//   {},
//   {},
// ];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetproductsByNameQuery();
  // @ts-ignore
  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.cart,
  );
  const productQuantity = (item) => {
    const productById = selectedProducts.find((itemUser) => {
      return itemUser.id === item.id;
    });
    return productById.quantity;
  };

  if (isLoading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <CircularProgress size={80} color="secondary" />
      </Box>
    );
  }
  if (error) {
    return <h1>There is an error...</h1>;
  }
  if (data) {
    return (
      <Box className="parent-of-cards">
        <Box
          className="container-of-card container "
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
            p: 1,
          }}
        >
          {data?.map((item, index) => {
            return (
              <Card
                key={index}
                sx={{
                  maxWidth: { xl: 294, lg: 277, md: 230, sm: 200, xs: 150 },
                  mb: 3,
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.05)",
                    transition: "0.5s",
                    borderRadius: "20px",
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 194,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,

                    overflow: "hidden",
                  }}
                  onClick={() => navigate(`/product-details/${item.id}`)}
                >
                  <img
                    src={item.imageLink[0]}
                    alt={item.productName}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      borderRadius: "10px",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* Btn and Counter switch */}
                  {selectedProductsID.includes(item.id) ? (
                    <Stack
                      direction="row"
                      spacing={2}
                      className="product-counter"
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <IconButton
                        sx={{ padding: "0px" }}
                        onClick={() => dispatch(increaseQuantity(item))}
                      >
                        <AddIcon
                          color="primary"
                          sx={{ fontSize: "0.5 rem", width: "0.7em" }}
                        />
                      </IconButton>
                      <Badge
                        className="product-quantity"
                        // badgeContent={selectedProducts[index].quantity}
                        badgeContent={productQuantity(item)}
                        color="primary"
                      />
                      <IconButton
                        sx={{ padding: "0px" }}
                        onClick={() => dispatch(decreaseQuantity(item))}
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
                      }}
                      onClick={() => {
                        dispatch(addToCart(item));
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}

                  {/*  End  Btn and Counter switch */}
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.error.light, mr: 1, ml: 1 }}
                  >
                    {item.price}$
                  </Typography>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Box>
    );
  }
};

export default Home;
