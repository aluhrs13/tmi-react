import React, { Component } from "react";
import {
    Flex,
    Heading,
    Box,
    Button,
    ButtonGroup,
    Skeleton,
} from "@chakra-ui/react";
import Logo from "../ui/Logo";

export default class SkeletonMini extends Component {
    render() {
        return (
            <Flex direction="column" w="80%" m={8}>
                <Box w={{ base: "60%", md: "40%" }}>
                    <Skeleton>
                        <Heading size="xl">Mini Name here</Heading>
                    </Skeleton>
                    <Skeleton>
                        <Heading size="md">by Peron Who Makes minis</Heading>
                    </Skeleton>
                </Box>

                <Flex my={8} direction={{ base: "column", md: "row" }}>
                    <Box w={{ base: "80%", md: "50%" }}>
                        <Skeleton shadow="md" rounded="lg">
                            <Logo />
                        </Skeleton>
                    </Box>

                    <Box m={4} w={{ base: "80%", md: "50%" }}>
                        <Skeleton>
                            <Box m={4} w={{ base: "80%", md: "50%" }}>
                                <Box w="100%">
                                    <ButtonGroup
                                        w="100%"
                                        size="lg"
                                        mx={2}
                                        isAttached
                                    >
                                        <Button isFullWidth mr="-px">
                                            View on TheMiniIndex
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </Skeleton>

                        <Skeleton>
                            <Heading>Text</Heading>
                            <Heading>Text</Heading>
                            <Heading>Text</Heading>
                            <Heading>Text</Heading>
                            <Heading>Text</Heading>
                        </Skeleton>
                    </Box>
                </Flex>
            </Flex>
        );
    }
}
