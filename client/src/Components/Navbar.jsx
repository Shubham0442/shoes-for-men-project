import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  SlideFade,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { BiSolidCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import AccountPopover from "./AccountPopover";
import { getCart } from "../Redux/CartRedux/action";

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
    color: "#e9ad28",
    borderBottom: "2px solid #e9ad28"
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
      zIndex="1000000000000000"
      top="0"
      left="0"
      right="0"
      bg="#fff"
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="80%" h="100%" alignItems="center" justifyContent="space-between">
        <Flex gap="20px">
          <Box
            display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
            alignItems="center"
            justifyContent="center"
          >
            <HamburgerIcon fontSize="25px" />
          </Box>
          <Box w="100px" h="90px">
            <Image
              w="100%"
              h="100%"
              src="/shoes-for-men-logo-2.png"
              objectFit="contain"
            />
          </Box>
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            gap="15px"
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
              All Products
            </NavLink>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end" gap="15px">
          <Box>
            <FaHeart fontSize="20px" />
          </Box>
          <Box>
            <FaShoppingCart fontSize="20px" />
          </Box>
          {token && (authUser || isAdmin) ? (
            <AccountPopover />
          ) : (
            <Button
              size={{ base: "xs", sm: "sm", md: "md", lg: "md" }}
              onClick={() => navigate("/login")}
              bg="#ffa41c"
              color="#fff"
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
