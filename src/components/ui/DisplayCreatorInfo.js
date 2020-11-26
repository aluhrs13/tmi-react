import React, { Component } from "react";
import { Flex, Link, Heading, Button, Box } from "@chakra-ui/react";

export default class DisplayCreatorInfo extends Component {
    render() {
        return (
            <Flex direction="column" px={{ base: 4, md: 32 }} py={8}>
                <Heading>{this.props.creatorInfo.name}</Heading>
                <Box>
                    {this.props.creatorInfo.sourceSites.map((element, id) => (
                        <Link href={element.url} key={id}>
                            <Button
                                key={element.id}
                                m={1}
                                bg={
                                    "sourceSites." +
                                    element.siteName.toLowerCase()
                                }
                                color={
                                    "sourceSitesFG." +
                                    element.siteName.toLowerCase()
                                }
                            >
                                {element.siteName}
                            </Button>
                        </Link>
                    ))}
                </Box>
            </Flex>
        );
    }
}
