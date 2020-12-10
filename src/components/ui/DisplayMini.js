import React, { Component } from "react";
import {
    Flex,
    Heading,
    Image,
    Box,
    Link,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Skeleton,
} from "@chakra-ui/react";
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
        this.state = {
            loading: true,
        };
    }
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
                    <Heading size="xl">{this.props.miniData.name}</Heading>
                    <Heading size="md">
                        by{" "}
                        <Link
                            as={RouterLink}
                            to={"/creators/" + this.props.miniData.creator.id}
                        >
                            {this.props.miniData.creator.name}
                        </Link>
                    </Heading>
                </Box>

                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    alignItems="top"
                    w={{ base: "95%", md: "80%", xl: "60%" }}
                >
                    <Skeleton
                        rounded="lg"
                        startColor={"sourceSites." + this.sourceSite}
                        endColor="gray.900"
                        mx={4}
                        mt={{ base: 4, md: 0 }}
                        w={{ base: "90%", md: "50%" }}
                        isLoaded={!this.state.loading}
                    >
                        <Image
                            rounded="lg"
                            shadow="md"
                            w={"100%"}
                            src={this.props.miniData.thumbnail}
                            alt={"Image of " + this.props.miniData.name}
                            onLoad={() => {
                                this.setState({ loading: false });
                            }}
                        />
                    </Skeleton>

                    <Box
                        w={{ base: "90%", md: "50%" }}
                        mx={4}
                        mt={{ base: 4, md: 0 }}
                    >
                        <Button
                            isFullWidth
                            bg={"sourceSites." + this.sourceSite}
                            color={"sourceSitesFG." + this.sourceSite}
                        >
                            <Link
                                href={
                                    "https://theminiindex.com/Minis/Redirect?beta=true&id=" +
                                    this.props.miniData.id
                                }
                            >
                                View on {this.sourceSite}
                            </Link>
                        </Button>

                        {this.props.miniData.status === 0 ||
                        this.props.miniData.status === 5 ? (
                            <Alert status="warning" m={2}>
                                <AlertIcon />
                                <Box flex="1">
                                    <AlertTitle>Pending Approval</AlertTitle>
                                    <AlertDescription display="block">
                                        This model is pending approval. If there
                                        aren't any tags below, try adding some.
                                        If there are, give it a few days, we
                                        only approve a few a day.
                                    </AlertDescription>
                                </Box>
                            </Alert>
                        ) : (
                            ""
                        )}

                        {this.props.miniData.status === 2 ||
                        this.props.miniData.status === 4 ? (
                            <Alert status="error" m={2}>
                                <AlertIcon />
                                <Box flex="1">
                                    <AlertTitle>Rejected</AlertTitle>
                                    <AlertDescription display="block">
                                        This model was rejected. There's a few
                                        reasons we reject minis, normally
                                        because there's a duplicate or it's not
                                        made for tabletop gaming. If you think
                                        this is a mistake, get in touch on
                                        Reddit, Discord, or email using the
                                        "Feedback" buttons above.
                                    </AlertDescription>
                                </Box>
                            </Alert>
                        ) : (
                            ""
                        )}

                        <TagList
                            tags={this.props.miniData.tags}
                            miniId={this.props.miniData.id}
                        />
                    </Box>
                </Flex>
            </Flex>
        );
    }
}
