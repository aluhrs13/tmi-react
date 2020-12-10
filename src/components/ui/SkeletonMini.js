import React, { Component } from "react";
import { Flex, Heading, Box, Button, Skeleton } from "@chakra-ui/react";
import Logo from "../ui/Logo";

export default class SkeletonMini extends Component {
    render() {
        return (
            <Flex direction="column" w={"100%"} align="center">
                <Box
                    px={{ base: 4, md: 32 }}
                    py={8}
                    mb={2}
                    bg="primary.100"
                    w={"100%"}
                >
                    <Skeleton w={{ base: "80%", md: "40%" }}>
                        <Heading size="xl">Mini Name here</Heading>
                    </Skeleton>
                    <Skeleton w={{ base: "80%", md: "40%" }}>
                        <Heading size="md">by Peron Who Makes minis</Heading>
                    </Skeleton>
                </Box>

                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    alignItems="top"
                    w={{ base: "95%", md: "80%", xl: "60%" }}
                >
                    <Box w={{ base: "100%", md: "50%" }}>
                        <Skeleton shadow="md" rounded="lg">
                            <Logo mx={4} w={"100%"} />
                        </Skeleton>
                    </Box>{" "}
                    <Box
                        w={{ base: "90%", md: "50%" }}
                        mx={4}
                        mt={{ base: 4, md: 0 }}
                    >
                        <Skeleton>
                            <Box m={4} w={{ base: "80%", md: "50%" }}>
                                <Button
                                    isFullWidth
                                    bg={"sourceSites." + this.sourceSite}
                                    color={"sourceSitesFG." + this.sourceSite}
                                ></Button>
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
