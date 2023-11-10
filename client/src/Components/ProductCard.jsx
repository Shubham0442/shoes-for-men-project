import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ elem }) => {
  return (
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
          <Text fontWeight={"550"} fontSize={"15px"} color={"#8d8d8d"}>
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
            w="31px"
            h={"25px"}
            p="2px"
            borderRadius={"3px"}
          >
            <Text>★{elem.rating}</Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default ProductCard;
