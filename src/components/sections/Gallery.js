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
            <MotionBox
                bg="white"
                shadow="md"
                borderWidth="1px"
                rounded="lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
            >
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
            </MotionBox>
        );
    }
}

function SkeletonGrid(size) {
    return Array(size)
        .fill()
        .map((item, index) => (
            <Box bg="white" shadow="md" borderWidth="1px" rounded="lg" w="100%">
                <Center>
                    <Skeleton h="256px" w="100%"></Skeleton>
                </Center>

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

export default function Gallery(props) {
    return (
        <Flex direction={{ base: "column", md: "row" }} w="100%">
            <SimpleGrid
                columns={{ base: "1", sm: "2", md: "3", lg: "4", xl: "5" }}
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
