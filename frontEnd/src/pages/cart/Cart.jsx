import {
  Box,
  styled,
  Button,
  Typography,
  Badge,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import "./Cart.css";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../Redux/cartSlice";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: "18rem",
  [theme.breakpoints.up("sm")]: {
    width: "20rem",
  },
  [theme.breakpoints.up("md")]: {
    width: "30rem",
  },
  [theme.breakpoints.up("lg")]: {
    width: "40rem",
  },
  [theme.breakpoints.up("xl")]: {
    width: "48rem",
  },
  height: "5rem",
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

// const recievePaperFromApi = [{}, {}, {}, {}, {}, {}];

const Cart = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.cart);
  console.log(selectedProducts);
  const subTotal = selectedProducts.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  return (
    <Box className="parent-of-cards">
      <Stack
        direction="column"
        spacing={8}
        className="container-of-cards-checkout container border"
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
        flexWrap={"wrap"}
      >
        <Stack
          className="container-of-cards "
          direction="column"
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
        >
          {/* Cards Section */}
          {selectedProducts.map((item, index) => {
            // ...existing code...
            return (
              <DemoPaper key={index}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className="product-container container"
                >
                  <DeleteIcon
                    color="error"
                    onClick={() => dispatch(removeFromCart(item))}
                  />
                  <Typography
                    variant="body1"
                    color="primary"
                    fontSize={{ xs: "0.5rem", sm: "1rem" }}
                  >
                    {item.price * item.quantity}$
                  </Typography>
                  {/* Counter  */}
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
                    <Badge badgeContent={item.quantity} color="primary" />
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
                  {/* Counter End  */}
                  {/* Product name&photo */}
                  <Stack
                    className="product-info"
                    direction={"row"}
                    spacing={1}
                    alignItems={"center"}
                  >
                    <Typography
                      variant="body1"
                      color="primary"
                      fontSize={{ xs: "0.5rem", sm: "1rem" }}
                    >
                      {item.productName}
                    </Typography>
                    <Avatar
                      alt={item.productName}
                      src={item.imageLink[0]}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Stack>
                </Stack>
              </DemoPaper>
            );
          })}
        </Stack>
        {/* Cards Section End */}

        {/* CehckOut Box */}
        {subTotal === 0 ? (
          <Paper>
            <Typography
              variant="body1"
              color="primary"
              textAlign={"center"}
              sx={{ p: 2 }}
            >
              Your cart is empty. Continue shopping to add items.
            </Typography>
          </Paper>
        ) : (
          <Paper
            className="container-of-checkout "
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.7rem",
              gap: 2,
              width: {
                xs: "11rem",
                sm: "15rem",
                md: "20rem",
                lg: "25rem",
                xl: "30rem",
              },
              marginBottom: "2rem !important",
            }}
          >
            {" "}
            <Typography
              sx={{ fontSize: { xs: "1rem", md: "1.8rem" }, lineHeight: 1 }}
              color="primary"
              textAlign={"center"}
            >
              {" "}
              Check Out{" "}
            </Typography>
            <Divider
              sx={{
                my: 2,
                width: "100%",
                bgcolor: "primary.main",
                height: "2px",
              }}
            />
            <Stack
              direction={"column"}
              spacing={2}
              alignItems={"center"}
              sx={{ width: "100%" }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ width: "90%" }}
                className="total-price-container"
              >
                <Typography variant="body2" color="primary">
                  Total Price:
                </Typography>
                <Typography variant="body2" color="primary">
                  {subTotal}$
                </Typography>
              </Stack>
              <Divider
                sx={{
                  my: 2,
                  width: "100%",
                  bgcolor: "primary.main",
                  height: "2px",
                }}
              />

              <Button variant="contained" color="primary">
                Check Out
              </Button>
            </Stack>
          </Paper>
        )}

        {/* CehckOut Box End */}
      </Stack>
    </Box>
  );
};

export default Cart;
