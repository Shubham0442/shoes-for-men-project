import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import {
  useDisclosure,
  Button,
  Stack,
  Heading,
  Text,
  FormLabel,
  useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Redux/UserAuthReducer/action";
import { getCart } from "../Redux/CartRedux/action";
import { getAllOrderDetails } from "../Redux/orderDetailsReducer/action";
import { getDeliveryAddress } from "../Redux/deliveryAddressReducer/action";
import ButtonLoader from "../Components/ButtonLoader";

const Login = () => {
  const { onClose } = useDisclosure();
  const dispatch = useDispatch();
  const loginSuccessToast = useToast();
  const loginFailToast = useToast();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const { isLoading } = useSelector((state) => state?.userAuthReducer);

  const handleLogin = (e) => {
    let { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogin(loginForm)).then((res) => {
      if (res?.type === "USER_LOGIN_SUCCESS") {
        dispatch(getCart(res.payload?.token)).then((resp) => {
          dispatch(getDeliveryAddress(res.payload?.token));
          dispatch(getAllOrderDetails(res.payload?.token));
        });
        loginSuccessToast({
          title: "Login Successful.",
          description: `Welcome ${res.payload.user.firstname}.`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top"
        });
        navigate("/");
      } else if (res?.type === "USER_LOGIN_FAILURE") {
        console.log("USER_LOGIN_FAILURE");
        loginFailToast({
          title: "Invalid Cridentials.",
          description: "Please enter correct login cridentials.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "bottom-right"
        });
      }
    });
    onClose();
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
          Login
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "xs", sm: "xs", md: "xs" }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Stack align={"center"}>
                <Heading fontSize={"2xl"} textAlign={"center"}>
                  Login
                </Heading>
              </Stack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody p={"20px"}>
              <form onSubmit={handleSubmit}>
                <Box mb={"10px"}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type={"email"}
                      value={loginForm.email}
                      borderRadius={"0px"}
                      name="email"
                      onChange={handleLogin}
                    />
                  </FormControl>
                </Box>

                <Box mb={"10px"}>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type={"password"}
                      value={loginForm.password}
                      borderRadius={"0px"}
                      name="password"
                      onChange={handleLogin}
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
                    Login
                  </Button>
                </Stack>
              </form>
              <Stack pt={6}>
                <Text align={"center"}>Not registered ?</Text>
                <Box
                  display={{
                    base: "none",
                    sm: "none",
                    md: "block",
                    lg: "block"
                  }}
                  w="20%"
                  m={"auto"}
                  textAlign={"center"}
                >
                  <Register />
                </Box>
                <Box display={{ base: "block", sm: "block", md: "none" }}>
                  <Link to={"/register"} color={"blue.400"}>
                    Register
                  </Link>
                </Box>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box> */}
      <Box
        w={{ base: "95%", sm: "95%", md: "65%", lg: "30%" }}
        m="auto"
        mt="30px"
      >
        <Stack align={"center"}>
          <Heading fontSize={"20px"} textAlign={"center"} mb="20px">
            Login
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Box mb={"4px"}>
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              size={"sm"}
              value={loginForm.email}
              borderRadius={"0px"}
              name="email"
              onChange={handleLogin}
            />
          </Box>

          <Box mb={"4px"}>
            <FormLabel>Password</FormLabel>
            <Input
              type={"password"}
              size={"sm"}
              value={loginForm.password}
              borderRadius={"0px"}
              name="password"
              onChange={handleLogin}
            />
          </Box>
          <Stack spacing={10} pt={2}>
            {isLoading ? (
              <ButtonLoader />
            ) : (
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
                Login
              </Button>
            )}
          </Stack>
        </form>
        <Box pt="20px" fontWeight="500">
          <Text align={"center"}>Not registered yet?</Text>
          <Box color={"blue.400"}>
            <Link to={"/register"}>Register</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
