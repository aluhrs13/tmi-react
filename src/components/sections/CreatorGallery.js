import React from "react";
import {
    Box,
    Heading,
    Flex,
    Link,
    SimpleGrid,
    Skeleton,
    Button,
    Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MotionBox } from "../ui/MotionBox.js";

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
                whileHover={{ scale: 1.1 }}
                p={4}
                alignItems="top"
            >
                <Flex direction="row" align="center">
                    <Box px={4} py={1}>
                        <Link
                            as={RouterLink}
                            to={"/creators/view/" + this.props.id}
                        >
                            <Heading>{this.props.name}</Heading>
                        </Link>
                        <strong>{this.props.miniCount}</strong> minis indexed
                        <Divider my={4} />
                        <Box>
                            {this.props.sourceSites.map((element, id) => (
                                <Link href={element.url}>
                                    <Button
                                        key={element.id}
                                        Link={element.url}
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
                    <Box px={4} py={1} w="80%">
                        <Skeleton>
                            <Heading>Name</Heading>
                        </Skeleton>
                        <Skeleton># minis indexed</Skeleton>
                        <Divider my={4} />
                        <Skeleton>
                            <Heading>Name</Heading>
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
        <Flex direction={{ base: "column", md: "row" }} w="100%" align="center">
            <SimpleGrid
                columns={{ base: "1", lg: "2" }}
                spacing={8}
                w={{ base: "100%" }}
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
