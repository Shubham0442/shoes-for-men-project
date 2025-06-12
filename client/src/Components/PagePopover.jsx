import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const PagePopover = () => {
  const navigate = useNavigate();

  const allLinks = [
    { title: "Home", route: "/" },
    { title: "Products", route: "/mensshoe" },
    { title: "About", route: "/about" }
  ];

  return (
    <>
      <Box display={{ base: "block", sm: "block", md: "block", lg: "none" }}>
        <Menu>
          <MenuButton variant="ghost" className="h-20 flex items-center justify-start">
            <Box
              display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
              alignItems="center"
              justifyContent="center"
            >
              <HamburgerIcon fontSize="20px" />
            </Box>
          </MenuButton>
          <MenuList w="50px" fontSize="15px">
            {allLinks?.map((menu) => (
              <MenuItem fontWeight="550" onClick={() => navigate(menu.route)}>
                {menu?.title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};

export default PagePopover;
