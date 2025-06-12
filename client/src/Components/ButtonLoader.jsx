import { Button, Spinner } from "@chakra-ui/react";
import React from "react";

const ButtonLoader = ({ height = "34px" }) => {
  return (
    <Button
      width="100%"
      height={height}
      disabled
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="5px"
    >
      <Spinner size="sm" /> Please wait
    </Button>
  );
};

export default ButtonLoader;
