import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiFilter } from "react-icons/fi";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getShoesData } from "../Redux/AppReducer/action";
import FilterComponent from "../Components/FilterComponent";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Spiner from "../Components/Spiner";
import { useState } from "react";

const MensShoe = () => {
  const dispatch = useDispatch();
  const shoesData = useSelector((state) => state.appReducer.productData);
  const loading = useSelector((state) => state.appReducer.isLoading);
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [searchParams] = useSearchParams();
  const [page, changePage] = useState(1);
  const [skip, setSkip] = useState(0);

  const mensBanners = [
    "https://www.npd.com/wp-content/uploads/2021/05/footwear-banner-1440x480.jpeg",
    "http://hamedsondesignstudio.co.uk/wp-content/uploads/2013/10/4ignite.jpg",
    "https://images.squarespace-cdn.com/content/v1/56e9b38c2b8dde820241b62d/1586805461470-38IYZYZ7TR83KU1BMCWM/Mens+footwear+banner.jpg"
  ];

  const paginationButtons = [
    { page: 1 },
    { page: 2 },
    { page: 3 },
    { page: 4 },
    { page: 5 }
  ];

  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  let sort = searchParams.get("sortBy");
  let pageNo = searchParams.get("page");

  if (sort === "asc")
    shoesData.sort(function (a, b) {
      return a.price - b.price;
    });
  else if (sort === "desc")
    shoesData.sort(function (a, b) {
      return b.price - a.price;
    });

  useEffect(() => {
    if (location || shoesData.length === 0) {
      let q = {
        params: {
          category: searchParams.getAll("category"),
          brand: searchParams.getAll("brand"),
          Rate: searchParams.getAll("Rate"),
          order: sort === "asc" ? 1 : sort === "desc" ? -1 : null,
          limit: 9,
          skip: skip
        }
      };
      dispatch(getShoesData(q));
    }
  }, [location.search, pageNo]);

  return (
    <Box bg={"#f1f3f6"} w={"100%"} mb="20px">
      <Box
        w={{ base: "80%", sm: "80%", md: "80%", lg: "80%" }}
        h={{ base: "200px", sm: "300px", md: "400px", lg: "500px" }}
        m={"auto"}
        pt="2px"
      >
        <Slider {...settings}>
          {mensBanners.map((ele) => (
            <Box key={ele}>
              <Image
                w={{ lg: "100%" }}
                h={{ base: "150px", sm: "250px", md: "350px", lg: "450px" }}
                src={ele}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Flex
        w={{ base: "95%", sm: "90%", md: "85%", lg: "80%" }}
        m={"auto"}
        h={{ base: "20px", sm: "40px" }}
        direction={"row"}
        display={{ base: "block", sm: "block", lg: "none" }}
        alignItems="center"
      >
        <Box>
          <Flex
            alignItems={"center"}
            justifyContent="left"
            bg={"whiteAlpha.800"}
            w={{ base: "14%", sm: "14%" }}
          >
            <Button
              size={"sm"}
              ref={btnRef}
              colorScheme="teal"
              variant={"ghost"}
              onClick={onOpen}
            >
              Filter
            </Button>
            <FiFilter />
          </Flex>

          <Drawer
            isOpen={isOpen}
            placement="bottom"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="xs"
            p={"20px"}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Apply Filter</DrawerHeader>

              <DrawerBody>
                <FilterComponent />
              </DrawerBody>

              <DrawerFooter>
                <Button onClick={onClose} colorScheme="blue">
                  Apply
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
      <Flex
        w={{ base: "95%", sm: "90%", md: "85%", lg: "80%" }}
        m={"auto"}
        gap="15px"
        pt={"15px"}
        justifyContent={"space-between"}
      >
        <Box
          w={"25%"}
          bg={"white"}
          display={{ base: "none", sm: "none", lg: "block" }}
        >
          <FilterComponent page={page} />
        </Box>

        <SimpleGrid
          w={{ base: "95%", sm: "90%", md: "80%", lg: "75%" }}
          columns={[1, 2, 2, 2, 3]}
          templateRows="auto"
          gap={8}
          m="auto"
        >
          {loading && <Spiner />}
          {shoesData.length > 0 &&
            shoesData.map((elem) => (
              <Box
                key={elem._id}
                bg={"white"}
                _hover={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                }}
              >
                <Link to={`/mensshoe/${elem._id}`}>
                  <Box
                    h={{ base: "270px", sm: "300px", md: "380px", lg: "390px" }}
                    boxSizing={"border-box"}
                    position={"relative"}
                    overflow={"hidden"}
                  >
                    <Image
                      w={"100%"}
                      h={{ base: "270px", sm: "300px", md: "380px" }}
                      src={elem.cover}
                      objectFit={"contain"}
                      transition={"all 0.5s"}
                      _hover={{
                        transform: "scale(1.1)",
                        transition: "all 0.5s"
                      }}
                      display={"block"}
                    />
                  </Box>
                  <Box textAlign={"left"} pl="10px" pb={"10px"}>
                    <Text
                      fontWeight={"550"}
                      fontSize={"15px"}
                      color={"#8d8d8d"}
                    >
                      {elem.category}
                    </Text>
                    <Text fontWeight={"500"} fontSize={"14px"}>
                      {elem.name}
                    </Text>
                    <Text fontWeight={"650"} fontSize={"12.5px"}>
                      {elem.brand}
                    </Text>
                    <Text fontWeight={"650"} fontSize={"14px"}>
                      ₹ {elem.price}
                    </Text>
                    <Box
                      bg={"green"}
                      color="white"
                      fontWeight={"550"}
                      fontSize={"11.5px"}
                      w="30px"
                      h={"25px"}
                      p="2px"
                      borderRadius={"3px"}
                    >
                      <Text>★{elem.rating}</Text>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
        </SimpleGrid>
      </Flex>

      <Box
        w={{ base: "70%", sm: "40%", md: "30%", lg: "10%" }}
        m={"auto"}
        mt={"20px"}
      >
        <Flex alignItems={"center"}>
          {paginationButtons?.map((el, i) => (
            <Button
              key={i}
              disabled={Number(page) === el.page}
              onClick={() => {
                changePage(el.page);
                setSkip(el.page === 1 ? 0 : el.page * 9);
              }}
            >
              {el.page}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default MensShoe;
