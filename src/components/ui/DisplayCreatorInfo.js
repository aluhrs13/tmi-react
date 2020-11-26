import React, { Component } from "react";
import { Flex, Link, Heading, Divider, Button, Box } from "@chakra-ui/react";

export default class DisplayCreatorInfo extends Component {
    render() {
        return (
            <Flex direction="column" mt={8} mx={16}>
                <Heading>{this.props.creatorInfo.name}</Heading>
                <Box>
                    {this.props.creatorInfo.sourceSites.map((element, id) => (
                        <Link href={element.url}>
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
                <Divider mt={4} borderColor="black" />
            </Flex>
        );
    }
}
