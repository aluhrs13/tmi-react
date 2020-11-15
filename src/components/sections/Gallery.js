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
                <Link href={this.props.link} color="black">
                    <Center>
                        <Image
                            src={fixCDN(this.props.thumbnail)}
                            className="galleryCard"
                            alt="User supplied image of this model"
                            maxH="256px"
                            fit="cover"
                            display={this.state.loading ? "none" : "block"}
                            onLoad={() => {
                                this.setState({ loading: false });
                            }}
                        />
                        {this.state.loading && (
                            <Skeleton h="256px" w="100%"></Skeleton>
                        )}
                    </Center>
                </Link>
                <Box mx={4} my={2}>
                    <Heading fontSize="l" lineHeight="1">
                        {this.props.name}
                    </Heading>
                    <Text my={1}>
                        by <Link>{this.props.creator}</Link>
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
                    <Skeleton h="236px" w="100%"></Skeleton>
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
    return Array.isArray(props.gridData) && props.gridData.length > 0 ? (
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
    ) : (
        <Flex />
    );
}
