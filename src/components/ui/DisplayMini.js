import React, { Component } from "react";
import {
    Flex,
    Heading,
    Image,
    Box,
    Link,
    Button,
    IconButton,
    ButtonGroup,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import TagList from "../ui/TagList";

export default class DisplayMini extends Component {
    constructor(props) {
        super(props);
        var urlParts = this.props.miniData.link
            .replace("http://", "")
            .replace("https://", "")
            .split(/[/?#]/)[0]
            .split(".");

        this.sourceSite = urlParts[urlParts.length - 2];

        console.log(this.props);
    }
    render() {
        return (
            <Flex direction="column" w="80%" m={8}>
                <Box>
                    <Heading size="xl">{this.props.miniData.name}</Heading>
                    <Heading size="md">
                        by{" "}
                        <Link
                            as={RouterLink}
                            to={
                                "/creators/view/" +
                                this.props.miniData.creator.id
                            }
                        >
                            {this.props.miniData.creator.name}
                        </Link>
                    </Heading>
                </Box>

                <Flex my={8} direction={{ base: "column", md: "row" }}>
                    <Image
                        src={this.props.miniData.thumbnail}
                        w={{ base: "80%", md: "50%" }}
                    />
                    <Box m={4} w={{ base: "80%", md: "50%" }}>
                        <Box w="100%">
                            <ButtonGroup w="100%" size="lg" isAttached>
                                <Button
                                    isFullWidth
                                    mr="-px"
                                    bg={"sourceSites." + this.sourceSite}
                                    color={"sourceSitesFG." + this.sourceSite}
                                >
                                    <Link href={this.props.miniData.link}>
                                        View on {this.sourceSite}
                                    </Link>
                                </Button>
                                <IconButton
                                    variant="outline"
                                    aria-label="Star mini"
                                    colorScheme="yellow"
                                    icon={<StarIcon />}
                                />
                            </ButtonGroup>
                        </Box>
                        <TagList tags={this.props.miniData.tags} />
                    </Box>
                </Flex>
            </Flex>
        );
    }
}
