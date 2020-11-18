import React, { Component } from "react";
import {
    Flex,
    Heading,
    Image,
    Text,
    Box,
    Link,
    Button,
    IconButton,
    ButtonGroup,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default class DisplayMini extends Component {
    render() {
        return (
            <Flex direction="column" w="80%" m={8}>
                <Box>
                    <Heading size="xl">Name of Mini</Heading>
                    <Heading size="md">
                        by <Link>Creator</Link>
                    </Heading>
                </Box>
                <Flex my={8} direction={{ base: "column", md: "row" }}>
                    <Image
                        fallbackSrc="https://via.placeholder.com/150"
                        w={{ base: "80%", md: "50%" }}
                    />

                    <Box m={4} w={{ base: "80%", md: "50%" }}>
                        <Box w="100%">
                            <ButtonGroup w="100%" size="lg" isAttached>
                                <Button
                                    isFullWidth
                                    mr="-px"
                                    bg="sourceSites.thingiverse"
                                    color="sourceSitesFG.thingiverse"
                                >
                                    View on Thingiverse
                                </Button>
                                <IconButton
                                    variant="outline"
                                    aria-label="Star mini"
                                    colorScheme="yellow"
                                    icon={<StarIcon />}
                                />
                            </ButtonGroup>
                        </Box>
                        <Box m={4}>
                            <Heading size="lg">Tag Category</Heading>
                            <Text>Tag</Text>
                            <Heading size="lg">Tag Category</Heading>
                            <Text>Tag</Text>
                            <Heading size="lg">Tag Category</Heading>
                            <Text>Tag</Text>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        );
    }
}
