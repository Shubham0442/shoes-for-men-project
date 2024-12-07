import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import Home_Hero_image from "../Assets/home_hero_image.png";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import adidas_home_hero_image from "../Assets/adidas_home_hero_image.png";
import Red_Wing_home_hero_image from "../Assets/Red_Wing_home_hero_image.png";
import { Fade } from "react-awesome-reveal";

const HomeHeroSection = () => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  const heroImages = [
    Home_Hero_image,
    adidas_home_hero_image,
    Red_Wing_home_hero_image
  ];

  return (
    <Flex
      w={{ base: "100%", sm: "95%", md: "90%", lg: "80%" }}
      h="100%"
      alignItems="center"
      justifyContent="center"
      m="auto"
    >
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        textAlign="left"
        flexDirection="column"
        w={{ base: "55%", sm: "55%", md: "50%", lg: "45%" }}
        h="auto"
        pl={{ base: "15px", sm: "10px", md: "0", lg: "0" }}
      >
        <Fade direction="left">
          <Heading
            color="var(--heading)"
            mb="10px"
            fontSize={{ base: "25px", sm: "28px", md: "38px", lg: "50px" }}
          >
            Embrace Your{" "}
            <span style={{ color: "var(--primary)" }}>Comfort </span>
            {window?.innerWidth > 950 ? (
              <br />
            ) : window?.innerWidth < 850 ? (
              <br />
            ) : null}
            with Us
          </Heading>
          <Box
            color="var(--para_text)"
            mb="5"
            fontSize="sm"
            fontWeight="semibold"
          >
            Discover our latest collection of premium men's shoes designed for{" "}
            {window?.innerWidth > 980 && <br />}
            comfort and elegance.
          </Box>
          <Button
            bg="var(--primary)"
            color="var(--white)"
            _hover={{ transform: "scale(1.2)" }}
            onClick={() => navigate("/mensshoe")}
            h={{ base: "35px", sm: "35px", md: "40px", lg: "42px" }}
            fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "15px" }}
          >
            Shop Now
          </Button>
        </Fade>
      </Box>
      <Box
        className="hero_slider_section"
        w="50%"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Slider {...settings}>
          {heroImages?.map((el, i) => (
            <Box
              key={i}
              w="100%"
              h="full"
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <Image
                w="100%"
                h={{ base: "135px", sm: "250px", md: "300px", lg: "450px" }}
                src={el}
                alt={`home_hero_image_${i}`}
                objectFit="contain"
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Flex>
  );
};

export default HomeHeroSection;
