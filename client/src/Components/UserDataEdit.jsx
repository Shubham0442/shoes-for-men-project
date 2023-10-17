import { Box, Flex, Text, Image, Select, useToast } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../Redux/userDataReducer/userDataAction";
import { useState } from "react";
import { getAllOrder, updateOrderStatusByAdmin } from "../Redux/orderDetailsReducer/action";

const UserDataEdit = () => {
  const userData = useSelector((state) => state.userDataReducer.userData);
  const [currentUser, setCurrentUser] = useState({});
  const token = useSelector((state) => state.userAuthReducer.token);
  const [allOrders, setAllOrders] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const statusUpdatedToast = useToast();

  const handleSetCurrentUserDetails = (allUsers) => {
    const user = allUsers?.find((el) => el._id === id);
    setCurrentUser(user);
    dispatch(getAllOrder(id, token)).then((res) => {
      if (res.type === "GET_USER_ALL_ORDERS") setAllOrders(res.payload);
    });
  };

  const handleChangeOrderStatus = (orderId, val) => {
    dispatch(updateOrderStatusByAdmin(orderId, val, token)).then((res) => {
      if (res.type === "UPDATE_ORDER_STATUS_BY_ADMIN")
        statusUpdatedToast({
          status: "info",
          position: "top",
          title: "Order status updated",
          isClosable: true,
          duration: 2500
        });
    });
  };

  useEffect(() => {
    if (userData?.length === 0) {
      dispatch(getUserData(token)).then((res) => {
        if (res.type === "GET_USERS_DATA_SUCCESS")
          handleSetCurrentUserDetails(res.payload);
      });
    } else handleSetCurrentUserDetails(userData);
  }, []);

  return (
    <Box w={"100%"} bg={"#f1f3f6 "} m={"auto"}>
      <Flex
        w={{ lg: "50%" }}
        m={"auto"}
        gap={"5px"}
        pt={"20px"}
        direction={{ base: "column", sm: "column" }}
      >
        <Text fontSize={"18px"} fontWeight={"550"}>
          User Data
        </Text>
        <Box
          w={{ base: "100%", sm: "100%" }}
          textAlign={"left"}
          fontSize={"14px"}
          fontWeight={"550"}
          bg={"white"}
          p={"10px"}
        >
          <Flex gap={"20px"} alignItems={"center"}>
            <Text>Firstname:</Text>
            <Text>{currentUser.firstname}</Text>
          </Flex>
          <Flex gap={"20px"}>
            <Text>Lastname:</Text>
            <Text>{currentUser.lastname}</Text>
          </Flex>
          <Flex gap={"20px"}>
            <Text>Email:</Text>
            <Text>{currentUser.email}</Text>
          </Flex>
          <Flex gap={"20px"}>
            <Text>Mobile Number:</Text>
            <Text>{currentUser.mobile}</Text>
          </Flex>
        </Box>
        <Box
          w={{ base: "100%", sm: "100%" }}
          m={"auto"}
          bg={"white"}
          p={"10px"}
        >
          <Text fontSize={"15px"} textAlign={"left"} fontWeight={"550"}>
            User Order Details
          </Text>
        </Box>

        <Box
          w={{ base: "100%", sm: "100%" }}
          m={"auto"}
          bg={"white"}
          p={"10px"}
        >
          {allOrders?.map((elem) => (
            <Box
              m={"auto"}
              alignItems={"center"}
              border={"1px solid gray"}
              borderRadius={"10px"}
              mb={"10px"}
              p={"15px"}
              key={elem.id}
            >
              <Flex gap={"8px"}>
                <Text
                  textDecoration={"underline"}
                  fontSize={"12px"}
                  textAlign={"left"}
                  pb={"20px"}
                  fontWeight={"550"}
                >
                  Order No.
                </Text>
                <Text
                  fontSize={"12px"}
                  textAlign={"left"}
                  pb={"20px"}
                  fontWeight={"550"}
                >
                  #{elem._id}
                </Text>
              </Flex>
              <Flex justifyContent={"space-evenly"}>
                <Box
                  textAlign={"left"}
                  pl={"10px"}
                  fontSize={"12px"}
                  fontWeight={"550"}
                >
                  {elem?.orderDetails?.map((item) => (
                    <Flex key={item.id} mb={"10px"} alignItems={"center"}>
                      <Box w={"80px"} pr={"10px"}>
                        <Image objectFit={"contain"} src={item.cover} />
                      </Box>
                      <Box>
                        <Text>{item.name}</Text>
                        <Text>Quantity: {item.Qty}</Text>
                        <Text>₹ {item.price}</Text>
                      </Box>
                    </Flex>
                  ))}
                </Box>
                <Box
                  textAlign={"left"}
                  pl={"10px"}
                  fontSize={"12px"}
                  fontWeight={"550"}
                >
                  <Text textDecoration={"underline"} fontSize={"12.5px"}>
                    Delivery Address
                  </Text>
                  <Text>
                    {elem.delivery_address?.AddressLine1},{" "}
                    {elem.delivery_address?.AddressLine2}
                  </Text>
                  <Text>
                    {elem.delivery_address?.Street},{" "}
                    {elem.delivery_address?.City}
                  </Text>
                  <Text>
                    {elem.delivery_address?.State},{" "}
                    {elem.delivery_address?.PinCode}
                  </Text>
                </Box>
              </Flex>
              <Box
                textAlign={"left"}
                pl={"10px"}
                fontSize={"12px"}
                fontWeight={"550"}
              >
                <Flex gap={"20px"} alignItems={"center"}>
                  <Text textDecoration={"underline"}>Order Status:</Text>
                  <Text>Order {elem.orderStatus}</Text>

                  <Select
                    size={"sm"}
                    onChange={(e) =>
                      handleChangeOrderStatus(elem._id, e.target.value)
                    }
                    w={"200px"}
                    textAlign={"left"}
                    pl={"10px"}
                    fontSize={"12px"}
                    fontWeight={"550"}
                  >
                    <option value="">Update Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Ariving Today">Ariving Today</option>
                    <option value="shipped">shipped</option>
                  </Select>
                </Flex>
              </Box>
            </Box>
          ))}
        </Box>
        <Box bg={"white"}></Box>
      </Flex>
    </Box>
  );
};

export default UserDataEdit;
