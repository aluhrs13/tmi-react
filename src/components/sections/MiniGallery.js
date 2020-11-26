import React from "react";
import {
    Box,
    Heading,
    Text,
    Image,
    Link,
    SimpleGrid,
    Skeleton,
    Center,
    Flex,
    Alert,
    AlertIcon,
    AlertTitle,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MotionBox } from "../ui/MotionBox.js";

function fixCDN(thumbnail) {
    if (thumbnail.includes("miniindex.blob.core.windows.net")) {
        return thumbnail.replace(
            "miniindex.blob.core.windows.net",
            "miniindexblobakamai.azureedge.net"
        );
    } else {
        return thumbnail;
    }
}

class GalleryItem extends React.Component {
    constructor(props) {
        super(props);

        var urlParts = this.props.link
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
            <MotionBox bg="white" shadow="md" borderWidth="1px" rounded="lg">
                <Link
                    as={RouterLink}
                    to={"/minis/" + this.props.id}
                    color="black"
                >
                    <Center>
                        <Skeleton
                            h="256px"
                            w="100%"
                            startColor={"sourceSites." + this.sourceSite}
                            endColor="gray.900"
                            isLoaded={!this.state.loading}
                        >
                            <Image
                                src={fixCDN(this.props.thumbnail)}
                                h="256px"
                                w="100%"
                                className="galleryCard"
                                alt={
                                    "User supplied image of " + this.props.name
                                }
                                fit="cover"
                                onLoad={() => {
                                    this.setState({ loading: false });
                                }}
                            />
                        </Skeleton>
                    </Center>
                </Link>
                {this.props.status === 0 || this.props.status === 5 ? (
                    <Alert status="warning">
                        <AlertIcon />
                        <Box flex="1">
                            <AlertTitle>Needs tags</AlertTitle>
                        </Box>
                    </Alert>
                ) : (
                    ""
                )}
                <Flex direction="row" mx={2} mb={2} mt={4} alignItems="top">
                    <Image
                        alt={`Mini source site is ${this.sourceSite}`}
                        src={`https://miniindex.blob.core.windows.net/react-images/${this.sourceSite}.png`}
                        mr={2}
                        h="32px"
                        w="32px"
                    />
                    <Flex direction="column">
                        <Heading fontSize="l" lineHeight="1">
                            {this.props.name}
                        </Heading>
                        <Text my={1}>
                            by{" "}
                            <Link
                                as={RouterLink}
                                to={"/creators/" + this.props.creator.id}
                            >
                                {this.props.creator.name}
                            </Link>
                        </Text>
                    </Flex>
                </Flex>
            </MotionBox>
        );
    }
}

function SkeletonGrid(size) {
    return Array(size)
        .fill()
        .map((item, index) => (
            <Box
                key={index}
                bg="white"
                shadow="md"
                borderWidth="1px"
                rounded="lg"
            >
                <Skeleton h="256px" w="100%"></Skeleton>

                <Skeleton mx={4} my={2}>
                    <Heading fontSize="xl" lineHeight="1">
                        Name
                    </Heading>
                </Skeleton>
                <Skeleton mx={4} my={2}>
                    <Text my={1}>by Person</Text>
                </Skeleton>
            </Box>
        ));
}

function GalleryData({ data }) {
    return data.map((anObjectMapped, index) => {
        return (
            <GalleryItem
                key={index}
                id={anObjectMapped["id"]}
                name={anObjectMapped["name"]}
                status={anObjectMapped["status"]}
                creator={anObjectMapped["creator"]}
                thumbnail={anObjectMapped["thumbnail"]}
                link={anObjectMapped["link"]}
            />
        );
    });
}

export default function MiniGallery(props) {
    return (
        <Center>
            <SimpleGrid
                columns={{ base: "1", sm: "2", md: "3", lg: "4", xl: "5" }}
                spacing={8}
                w={{ base: "100%" }}
            >
                {props.gridData === "" ? (
                    SkeletonGrid(props.gallerySize)
                ) : (
                    <GalleryData data={props.gridData} />
                )}
            </SimpleGrid>
        </Center>
    );
}
