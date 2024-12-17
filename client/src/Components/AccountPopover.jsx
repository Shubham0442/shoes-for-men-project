import { Avatar, Box, Flex } from "@chakra-ui/react";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const AccountPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const authUser = useSelector((state) => state.userAuthReducer);
  const token = useSelector((state) => state.userAuthReducer.token);
  const dispatch = useDispatch();
  const LogoutToast = useToast();
  const navigate = useNavigate();

  const allLinks = [
    { title: "My Account", route: "/myaccount" },
    { title: "My Cart", route: "/cart" },
    { title: "My Orders", route: "/myorders" },
    authUser?.userData?.cosign === "Admin" && {
      title: "Admin",
      route: "/adm"
    }
  ];

  const handleUserLogout = () => {
    dispatch(userLogout());
    dispatch(getCart());
    LogoutToast({
      title: "Successfully Logout.",
      description: "",
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
        <Menu>
          <MenuButton variant="ghost">
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
          </MenuButton>
          <MenuList w="50px" fontSize="15px">
            {allLinks?.map((menu) => (
              <MenuItem fontWeight="550" onClick={() => navigate(menu.route)}>
                {menu?.title}
              </MenuItem>
            ))}
            <Flex
              alignItems="center"
              justifyContent="flex-start"
              pl="10px"
              mt="5px"
            >
              <Button size="sm" onClick={handleUserLogout}>
                Logout
              </Button>
            </Flex>
          </MenuList>
        </Menu>
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
