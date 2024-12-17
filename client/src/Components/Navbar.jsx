import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AccountPopover from "./AccountPopover";
import { getCart } from "../Redux/CartRedux/action";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from "@chakra-ui/react";

const Navbar = () => {
  const authUser = useSelector((state) => state.userAuthReducer);
  const token = useSelector((state) => state.userAuthReducer.token);
  const isAdmin = useSelector((state) => state.adminAuthReducer);
  const cart = useSelector((state) => state.cartReducer.tempCart);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const activeStyle = {
    fontWeight: "650",
    fontSize: { base: "18px", md: "24px", lg: "40px" },
    color: "var(--primary)",
    borderBottom: "2px solid var(--primary)"
  };

  const inactiveStyle = {
    fontWeight: "450",
    color: "#646464",
    fontWeight: "550"
  };

  useEffect(() => {
    dispatch(getCart(token));
  }, [cart.length]);

  const cartLength = useMemo(() => {
    const length = cart?.reduce((acc, item) => acc + item.Qty, 0);
    return length;
  }, [cart]);

  return (
    <Box
      w="100%"
      h="80px"
      margin="auto"
      display="flex"
      position="fixed"
      zIndex="1000"
      top="0"
      left="0"
      right="0"
      bg="#fff"
      alignItems="center"
      justifyContent="center"
      boxShadow="rgba(33, 35, 38, 0.1) 0px 10px 10px -10px"
    >
      <Flex w="95%" h="100%" alignItems="center" justifyContent="space-between">
        <Flex gap="20px">
          <Box
            display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
            alignItems="center"
            justifyContent="center"
          >
            <HamburgerIcon fontSize="25px" />
          </Box>
          <Box
            w={{ base: "70px", sm: "80px", md: "90px", lg: "100px" }}
            h={{ base: "60px", sm: "70px", md: "80px", lg: "90px" }}
            onClick={() => navigate("/")}
          >
            <Image
              w="100%"
              h="100%"
              src="/shoes-for-men-logo-2.png"
              objectFit="contain"
              cursor="pointer"
            />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          gap="18px"
          display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Home
          </NavLink>
          <NavLink
            to="/mensshoe"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            About
          </NavLink>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="flex-end"
          gap="15px"
          cursor="pointer"
        >
          <Box>
            <FaHeart fontSize="20px" />
          </Box>
          <Box
            onClick={() => navigate("/cart")}
            cursor="pointer"
            position="relative"
          >
            <FaShoppingCart
              fontSize="20px"
              color={location?.pathname === "/cart" && "var(--primary)"}
            />
            {cartLength > 0 && (
              <Box
                position="absolute"
                height="20px"
                width="20px"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="var(--primary)"
                color="var(--white)"
                fontSize="11px"
                bottom="10px"
                left="10px"
              >
                {cartLength}
              </Box>
            )}
          </Box>
          {token && (authUser || isAdmin) ? (
            <AccountPopover />
          ) : (
            <Button
              h={{ base: "30px", sm: "30px", md: "32px", lg: "35px" }}
              onClick={() => navigate("/login")}
              bg="var(--primary)"
              p="10px 20px 10px 20px"
              color="var(--white)"
              fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "15px" }}
              _hover={{ transform: "scale(1.1)", bg: "#000" }}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
