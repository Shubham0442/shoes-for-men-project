import { Box, Button, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaginationButtons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = searchParams.get("page");

  const [page, changePage] = useState(initialPage || 1);

  useEffect(() => {
    if (page) {
      let params = {};
      page && (params.page = page);
      setSearchParams(params);
    }
  }, [setSearchParams, page]);

  return (
    <Flex alignItems={"center"}>
      <Button disabled={Number(page) === 1} onClick={() => changePage(1)}>
        1
      </Button>
      <Button disabled={Number(page) === 2} onClick={() => changePage(2)}>
        2
      </Button>
      <Button disabled={Number(page) === 3} onClick={() => changePage(3)}>
        3
      </Button>
      <Button disabled={Number(page) === 4} onClick={() => changePage(4)}>
        4
      </Button>
      <Button disabled={Number(page) === 5} onClick={() => changePage(5)}>
        5
      </Button>
      <Button disabled={Number(page) === 6} onClick={() => changePage(6)}>
        6
      </Button>
    </Flex>
  );
};

export default PaginationButtons;
