import React, { useState } from "react";
import { Box, Input, useToast } from "@chakra-ui/react";
import {
  Button,
  Stack,
  Heading,
  Text,
  FormLabel,
  Flex
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../Redux/UserAuthReducer/action";

const Register = () => {
  const [regForm, setRegForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: ""
  });
  const dispatch = useDispatch();
  const regToast = useToast();
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    let { name, value } = e.target;
    setRegForm({
      ...regForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userRegister({
        firstname: regForm.firstname,
        lastname: regForm.lastname,
        email: regForm.email,
        mobile: regForm.mobile,
        password: regForm.password,
        cosign: "user"
      })
    ).then((res) => {
      if (res?.type === "USER_REGISTER_SUCCESS")
        regToast({
          title: "Registration Successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
      navigate("/login");
    });
  };

  return (
    <Box w="80%" h="600px" m="auto">
      {/* <Box display={{ base: "none", sm: "none", md: "block", lg: "block" }}>
        <Button
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
          border={"0"}
          variant={"unstyled"}
          onClick={onOpen}
        >
          Register
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "xs", sm: "xs", md: "sm" }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Stack align={"center"}>
                <Heading fontSize={"2xl"} textAlign={"center"}>
                  Registration
                </Heading>
              </Stack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody p={"20px"}>
              <form onSubmit={handleSubmit}>
                <Flex
                  direction={{ base: "column", sm: "column", md: "row" }}
                  justifyContent="space-evenly"
                  gap={"5px"}
                >
                  <Box mb={"10px"}>
                    <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type={"text"}
                        value={regForm.firstname}
                        borderRadius={"0px"}
                        name="firstname"
                        onChange={handleRegistration}
                      />
                    </FormControl>
                  </Box>
                  <Box mb={"10px"}>
                    <FormControl isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type={"text"}
                        value={regForm.lastname}
                        borderRadius={"0px"}
                        name="lastname"
                        onChange={handleRegistration}
                      />
                    </FormControl>
                  </Box>
                </Flex>
                <Box mb={"10px"}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type={"email"}
                      value={regForm.email}
                      borderRadius={"0px"}
                      name="email"
                      onChange={handleRegistration}
                    />
                  </FormControl>
                </Box>
                <Box mb={"10px"}>
                  <FormControl isRequired>
                    <FormLabel>Mobile number</FormLabel>
                    <Input
                      type={"number"}
                      value={regForm.mobile}
                      borderRadius={"0px"}
                      name="mobile"
                      onChange={handleRegistration}
                    />
                  </FormControl>
                </Box>
                <Box mb={"10px"}>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type={"password"}
                      value={regForm.password}
                      borderRadius={"0px"}
                      name="password"
                      onChange={handleRegistration}
                    />
                  </FormControl>
                </Box>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "yellow.400"
                    }}
                    borderRadius={"0px"}
                    type={"submit"}
                  >
                    Register
                  </Button>
                </Stack>
              </form>
              <Stack pt={6}>
                <Text align={"center"}></Text>
                <Box display={{ base: "block", sm: "block", md: "none" }}>
                  Already user?
                  <Link to={"/register"} color={"blue.400"}>
                    Login
                  </Link>
                </Box>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box> */}
      <Box
        w={{ base: "95%", sm: "95%", md: "65%", lg: "40%" }}
        m="auto"
        mt="30px"
      >
        <Stack align="center" mt="10px">
          <Heading fontSize={"20px"} textAlign={"center"} mb="20px">
            Registration
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Flex
            w="100%"
            direction={{ base: "column", sm: "row", md: "row", lg: "row" }}
            justifyContent="space-between"
            gap={"10px"}
          >
            <Box
              mb={"4px"}
              w={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
            >
              <FormLabel>First Name</FormLabel>
              <Input
                type={"text"}
                size={"sm"}
                value={regForm.firstname}
                borderRadius={"0px"}
                name="firstname"
                onChange={handleRegistration}
              />
            </Box>
            <Box
              mb={"4px"}
              w={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
            >
              <FormLabel>Last Name</FormLabel>
              <Input
                type={"text"}
                size={"sm"}
                value={regForm.lastname}
                borderRadius={"0px"}
                name="lastname"
                onChange={handleRegistration}
              />
            </Box>
          </Flex>
          <Box mb={"4px"}>
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              size={"sm"}
              value={regForm.email}
              borderRadius={"0px"}
              name="email"
              onChange={handleRegistration}
            />
          </Box>
          <Box mb={"4px"}>
            <FormLabel>Mobile number</FormLabel>
            <Input
              type={"number"}
              size={"sm"}
              value={regForm.mobile}
              borderRadius={"0px"}
              name="mobile"
              onChange={handleRegistration}
            />
          </Box>
          <Box mb={"4px"}>
            <FormLabel>Password</FormLabel>
            <Input
              type={"password"}
              size={"sm"}
              value={regForm.password}
              borderRadius={"0px"}
              name="password"
              onChange={handleRegistration}
            />
          </Box>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="md"
              bg="var(--primary)"
              color={"white"}
              _hover={{
                bg: "yellow.400"
              }}
              borderRadius={"0px"}
              type={"submit"}
            >
              Register
            </Button>
          </Stack>
        </form>
        <Box pt="20px" fontWeight="500">
          <Text align={"center"}>Already a user?</Text>
          <Box color={"blue.400"}>
            <Link to={"/login"}>Login</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
