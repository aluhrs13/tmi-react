import React from "react"
import { Box, Divider, Link, Text, Flex } from "@chakra-ui/react"


export default function Footer() {
    return (
      
        <Flex bg="primary.600" p={8} direction={{ base: "column", lg: "row" }} color="white">
          <Box>
            <Text>Category</Text><br/>
            <Divider />
            <Link>Link1</Link><br/>
            <Link>Link1</Link><br/>
            <Link>Link1</Link><br/>
            <Link>Link1</Link>
          </Box>
          <Divider orientation="vertical"/>
          <Box>
            <Text>Category</Text><br/>
            <Divider />
            <Link>Link1</Link><br/>
            <Link>Link1</Link><br/>
            <Link>Link1</Link><br/>
            <Link>Link1</Link>
          </Box>
          <Divider orientation="vertical"/>
          <Box align="center">
            <Text>Category</Text><br/>
            <Divider />
            <Link>Link1</Link><br/>
            <Link>Link1</Link><br/>
            <Link>Link1</Link><br/>
            <Link>Link1</Link>
          </Box>
        </Flex>

    )
  }
