import React from "react";
import {
    Box,
    Heading,
    Text,
    Flex,
    Image,
    Link,
    SimpleGrid,
    Skeleton,
    Center,
    Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.custom(Box);

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

        this.state = {
            loading: false,
        };
    }

    render() {
        return (
            <MotionBox
                bg="white"
                shadow="md"
                borderWidth="1px"
                rounded="lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                p={4}
                alignItems="top"
            >
                <Flex direction="row">
                    <SimpleGrid columns="3" spacing={1}>
                        <Image w="30px" h="30px" />
                        <Image w="30px" h="30px" />
                        <Image w="30px" h="30px" />
                        <Image w="30px" h="30px" />
                        <Image w="30px" h="30px" />
                        <Image w="30px" h="30px" />
                        <Image w="30px" h="30px" />
                        <Image w="30px" h="30px" />
                        <Image w="30px" h="30px" />
                    </SimpleGrid>
                    <Box px={4} py={1}>
                        <Link href={"/creators/view/" + this.props.id}>
                            <Heading>{this.props.name}</Heading>
                        </Link>
                        <strong>{this.props.miniCount}</strong> minis indexed
                        <Box>
                            {this.props.sourceSites.map((element, id) => (
                                <Button
                                    key={element.id}
                                    href={element.url}
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
                            ))}
                        </Box>
                    </Box>
                </Flex>
            </MotionBox>
        );
    }
}

function SkeletonGrid(size) {
    return Array(size)
        .fill()
        .map((item, index) => (
            <MotionBox
                bg="white"
                shadow="md"
                borderWidth="1px"
                rounded="lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                p={4}
                alignItems="top"
            >
                <Flex direction="row">
                    <SimpleGrid columns="3" spacing={1}>
                        <Skeleton w="30px" h="30px" />
                        <Skeleton w="30px" h="30px" />
                        <Skeleton w="30px" h="30px" />
                        <Skeleton w="30px" h="30px" />
                        <Skeleton w="30px" h="30px" />
                        <Skeleton w="30px" h="30px" />
                        <Skeleton w="30px" h="30px" />
                        <Skeleton w="30px" h="30px" />
                        <Skeleton w="30px" h="30px" />
                    </SimpleGrid>
                    <Box px={4} py={1}>
                        <Skeleton>
                            <Heading>Name</Heading>
                        </Skeleton>
                        <Skeleton># minis indexed</Skeleton>
                        <Skeleton>
                            <Button>Placeholder</Button>
                            <Button>Placeholder</Button>
                            <Button>Placeholder</Button>
                        </Skeleton>
                    </Box>
                </Flex>
            </MotionBox>
        ));
}

function GalleryData({ data }) {
    return data.map((anObjectMapped, index) => {
        return (
            <GalleryItem
                key={index}
                id={anObjectMapped["id"]}
                name={anObjectMapped["name"]}
                miniCount={anObjectMapped["miniCount"]}
                sourceSites={anObjectMapped["sourceSites"]}
            />
        );
    });
}

export default function Gallery(props) {
    return (
        <Flex direction={{ base: "column", md: "row" }} w="100%">
            <SimpleGrid
                columns={{ base: "1", lg: "2" }}
                spacing={8}
                w={{ base: "100%", xl: "1800px" }}
            >
                {props.gridData === "" ? (
                    SkeletonGrid(21)
                ) : (
                    <GalleryData data={props.gridData} />
                )}
            </SimpleGrid>
        </Flex>
    );
}

/*
                <Link href={"/minis/view/" + this.props.id} color="black">
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
                <Box mx={4} my={2}>
                    <Heading fontSize="l" lineHeight="1">
                        {this.props.name}
                    </Heading>
                    <Text my={1}>
                        by{" "}
                        <Link href={"/creators/view/" + this.props.creator.id}>
                            {this.props.creator}
                        </Link>
                    </Text>
                </Box>
                */
