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
                p={4}
                alignItems="top"
            >
                <Link as={RouterLink} to={"/creators/" + this.props.id}>
                    <Heading className="CreatorBreak">
                        {this.props.name}
                    </Heading>
                </Link>
                <strong>{this.props.miniCount}</strong> minis indexed
                <Divider my={4} />
                <Box>
                    {this.props.sourceSites.map((element, id) => (
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
                p={4}
                alignItems="top"
                key={index}
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
        <SimpleGrid
            columns={{ base: "1", lg: "2" }}
            spacing={{ base: 4, md: 8 }}
            w={"95%"}
            my={4}
        >
            {props.gridData === "" ? (
                SkeletonGrid(21)
            ) : (
                <GalleryData data={props.gridData} />
            )}
        </SimpleGrid>
    );
}
