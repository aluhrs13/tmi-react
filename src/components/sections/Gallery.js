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

function GalleryItem({ id, name, status, creator, thumbnail, link, ...rest }) {
    return (
        <MotionBox
            bg="white"
            shadow="md"
            borderWidth="1px"
            rounded="lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            {...rest}
        >
            <Link href={link} color="black">
                <Center>
                    <Image
                        src={fixCDN(thumbnail)}
                        className="galleryCard"
                        alt="User supplied image of this model"
                        fit="cover"
                    />
                </Center>
            </Link>
            <Box mx={4} my={2}>
                <Heading fontSize="xl" lineHeight="1">
                    {name}
                </Heading>
                <Text my={1}>
                    by <Link>{creator}</Link>
                </Text>
            </Box>
        </MotionBox>
    );
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
    return (
        <Flex
            justify="center"
            bg="primary.50"
            direction={{ base: "column", md: "row" }}
            p={8}
        >
            <SimpleGrid
                columns={{ base: "2", md: "3", lg: "4", xl: "5" }}
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
