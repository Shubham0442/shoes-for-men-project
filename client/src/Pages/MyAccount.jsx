import { Box, Text, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddDeliveryAddressAccount from "../Components/AddDeliveryAddressAccount";
import { getDeliveryAddress } from "../Redux/deliveryAddressReducer/action";

const MyAccount = () => {
  const userDetails = useSelector((state) => state.userAuthReducer.userData);
  const token = useSelector((state) => state.userAuthReducer.token);
  const [userInfo] = useState(userDetails);
  const dispatch = useDispatch();
  const addresses = useSelector(
    (state) => state.deliveryAddressReducer.address
  );

  useEffect(() => {
    if (addresses?.length === 0) dispatch(getDeliveryAddress(token));
  }, []);

  return (
    <Box w={"100%"} bg={"#f1f3f6 "} m={"auto"} pt={"20px"}>
      <Box
        w={{ base: "85%", sm: "70%", md: "65%", lg: "30%" }}
        m={"auto"}
        bg={"white"}
        pl={"15px"}
        mb={"10px"}
      >
        <Text fontSize={"18px"} fontWeight={"550"}>
          My Account
        </Text>
      </Box>
      <Box
        w={{ base: "85%", sm: "70%", md: "65%", lg: "30%" }}
        m={"auto"}
        bg={"white"}
        pl={"20px"}
        fontSize={"14px"}
        fontWeight={"550"}
        pt={"20px"}
        pb={"20px"}
        pr={"20px"}
        mb={"10px"}
      >
        <Box>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"50px"}
          >
            <Box w={"50%"} textAlign={"left"}>
              <Text>Firstname</Text>
            </Box>
            <Box w={"50%"} textAlign={"left"}>
              <Text>{userInfo.firstname}</Text>
            </Box>
          </Flex>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"50px"}
          >
            <Box w={"50%"} textAlign={"left"}>
              <Text>Lastname</Text>
            </Box>
            <Box w={"50%"} textAlign={"left"}>
              <Text>{userInfo.lastname}</Text>
            </Box>
          </Flex>
        </Box>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"50px"}
        >
          <Box w={"50%"} textAlign={"left"}>
            <Text>Email</Text>
          </Box>
          <Box w={"50%"} textAlign={"left"}>
            <Text>{userInfo.email}</Text>
          </Box>
        </Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"50px"}
        >
          <Box w={"50%"} textAlign={"left"}>
            <Text>Mobile number</Text>
          </Box>
          <Box w={"50%"} textAlign={"left"}>
            <Text>{userInfo.mobile}</Text>
          </Box>
        </Flex>
      </Box>
      <Box
        w={{ base: "85%", sm: "70%", md: "65%", lg: "30%" }}
        m={"auto"}
        pt={"5px"}
        pb={"5px"}
        bg={"white"}
        pl={"15px"}
        mb={"10px"}
      >
        <Text fontSize={"15px"} textAlign={"left"} fontWeight={"550"} pl="5px">
          Delivery Address
        </Text>
      </Box>
      {addresses?.length !== 0 ? (
        <Box
          w={{ base: "85%", sm: "70%", md: "65%", lg: "30%" }}
          m={"auto"}
          bg={"white"}
          pl={"15px"}
          fontSize={"14px"}
          fontWeight={"550"}
          pt={"20px"}
          pb={"20px"}
          pr={"15px"}
        >
          {addresses.map((el) => (
            <Box
              key={el._id}
              border={"1px solid #dcdcdb"}
              mb="15px"
              p="5px"
              borderRadius="5px"
            >
              <Box>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={"50px"}
                  mb={"10px"}
                >
                  <Box w={"50%"} textAlign={"left"}>
                    <Text>Address Line1</Text>
                  </Box>
                  <Box w={"50%"} textAlign={"left"}>
                    <Text>{el?.AddressLine1}</Text>
                  </Box>
                </Flex>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={"50px"}
                  mb={"10px"}
                >
                  <Box w={"50%"} textAlign={"left"}>
                    <Text>Address Line2</Text>
                  </Box>
                  <Box w={"50%"} textAlign={"left"}>
                    <Text>{el?.AddressLine2}</Text>
                  </Box>
                </Flex>
              </Box>

              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={"50px"}
                mb={"10px"}
              >
                <Box w={"50%"} textAlign={"left"}>
                  <Text>Street</Text>
                </Box>
                <Box w={"50%"} textAlign={"left"}>
                  <Text>{el?.Street}</Text>
                </Box>
              </Flex>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={"50px"}
                mb={"10px"}
              >
                <Box w={"50%"} textAlign={"left"}>
                  <Text>City</Text>
                </Box>
                <Box w={"50%"} textAlign={"left"}>
                  <Text>{el?.City}</Text>
                </Box>
              </Flex>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={"50px"}
                mb={"10px"}
              >
                <Box w={"50%"} textAlign={"left"}>
                  <Text>State</Text>
                </Box>
                <Box w={"50%"} textAlign={"left"}>
                  <Text>{el?.State}</Text>
                </Box>
              </Flex>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={"50px"}
                mb={"10px"}
              >
                <Box w={"50%"} textAlign={"left"}>
                  <Text>Pincode</Text>
                </Box>
                <Box w={"50%"} textAlign={"left"}>
                  <Text>{el?.PinCode}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          w={{ base: "85%", sm: "70%", md: "65%", lg: "30%" }}
          m={"auto"}
          pt={"5px"}
          pb={"5px"}
          bg={"white"}
          pl={"15px"}
        >
          <Text mb={"10px"}>Not Available</Text>
          <AddDeliveryAddressAccount />
        </Box>
      )}
    </Box>
  );
};

export default MyAccount;
