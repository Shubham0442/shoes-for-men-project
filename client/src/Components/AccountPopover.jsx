import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Button,
  useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../Redux/UserAuthReducer/action";
import { removeFromCart, getCart } from "../Redux/CartRedux/action";
import {
  getDeliveryAddress,
  removeAddressFromCommonData
} from "../Redux/deliveryAddressReducer/action";
import {
  getAllOrderDetails,
  removeFromAllOrders
} from "../Redux/orderDetailsReducer/action";

const AccountPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const authUser = useSelector((state) => state.userAuthReducer);
  const token = useSelector((state) => state.userAuthReducer.token);
  const dispatch = useDispatch();
  const LogoutToast = useToast();
  const navigate = useNavigate();

  const handleUserLogout = () => {
    dispatch(userLogout());
    dispatch(getCart());
    LogoutToast({
      title: "Successfully Logout.",
      description: ``,
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top-ri"
    });
    navigate("/");
    onClose();
  };

  return (
    <>
      <Box display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
        <Popover>
          <PopoverTrigger>
            <Button variant="unstyled">
              <Avatar
                size="sm"
                name={
                  authUser?.userData?.cosign === "user" ? (
                    authUser?.userData?.firstname +
                    " " +
                    authUser?.userData?.lastname
                  ) : authUser?.userData?.cosign === "Admin" ? (
                    `${authUser?.userData?.firstname}(Admin)` +
                    " " +
                    authUser?.userData?.lastname
                  ) : (
                    <></>
                  )
                }
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Hello</PopoverHeader>
            <PopoverBody textAlign={"left"} pl={"100px"}>
              <Box>
                <Link to={"/myaccount"}>My Account</Link>
              </Box>
              <Box>
                <Link to={"/cart"}>My Cart</Link>
              </Box>
              <Box>
                <Link to={"/myorders"}>My Orders</Link>
              </Box>
              {authUser?.userData?.cosign === "Admin" && (
                <Box>
                  <Link to={"/adm"}>Admin</Link>
                </Box>
              )}
              <Box>
                <Button onClick={handleUserLogout} variant={"unstyled"}>
                  Logout
                </Button>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <Box display={{ base: "block", sm: "block", md: "block", lg: "none" }}>
        <Button ref={btnRef} variant={"unstyled"} onClick={onOpen}>
          {authUser?.userData?.cosign === "user" ? (
            authUser?.userData?.firstname
          ) : authUser?.userData?.cosign === "Admin" ? (
            `${authUser?.userData?.firstname}(Admin)`
          ) : (
            <></>
          )}
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Hello{" "}
              {authUser?.userData?.cosign === "user" ? (
                authUser?.userData?.firstname
              ) : authUser?.userData?.cosign === "Admin" ? (
                `${authUser?.userData?.firstname}(Admin)`
              ) : (
                <></>
              )}{" "}
            </DrawerHeader>

            <DrawerBody>
              <Box onClick={onClose}>
                <Link to={"/myaccount"}>My Account</Link>
              </Box>
              <Box onClick={onClose}>
                <Link to={"/cart"}>My Cart</Link>
              </Box>
              <Box onClick={onClose}>
                <Link to={"/myorders"}>My Orders</Link>
              </Box>
              {authUser?.userData?.cosign === "Admin" && (
                <Box onClick={onClose}>
                  <Link to={"/adm"}>Admin</Link>
                </Box>
              )}
              <Box>
                <Button onClick={handleUserLogout} variant={"unstyled"}>
                  Logout
                </Button>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default AccountPopover;
