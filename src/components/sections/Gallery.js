import React from "react"
import { Box, Heading, Text, Flex, Image, Link, SimpleGrid, Skeleton } from "@chakra-ui/core";
import { motion } from "framer-motion";

const MotionBox = motion.custom(Box);

function fixCDN(thumbnail){
    if(thumbnail.includes("miniindex.blob.core.windows.net")){
        return thumbnail.replace("miniindex.blob.core.windows.net","miniindexblobakamai.azureedge.net")
    }else{
        return thumbnail;
    }
}

function GalleryItem({ id, name, status, creator, thumbnail, link, ...rest }) {
    return (
        <MotionBox
            bg="white"
            shadow="md"
            borderWidth="1px"
            align="center"
            p={4}
            rounded="lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            {...rest}
        >
            <Link href={link} color="black">
                <div align="center">
                    <Image width="314px" height="236px" src={fixCDN(thumbnail)} className="galleryCard" alt="User supplied image of this model"/>
                </div>
            </Link>
            <Heading fontSize="xl">{name}</Heading>
            <Text my={1}>by <Link>{creator}</Link></Text>
        </MotionBox>
    );
}

function SkeletonGrid(size){
    return(
        Array(size).fill().map((item, index) =>
            <MotionBox
                key={index}
                bg="white"
                shadow="md"
                borderWidth="1px"
                align="center"
                p={4}
                rounded="lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
            >
                <Skeleton>
                    <div align="center">
                        <Box width="314px" height="236px" className="galleryCard" rounded="lg"/>
                    </div>
                </Skeleton>

                <Skeleton>
                    <Heading fontSize="xl">Thing</Heading>
                </Skeleton>

                <Skeleton>
                    <Text my={1}>by Person</Text>
                </Skeleton>
            </MotionBox>
        )
    );
}

function GalleryData({data}){
    return(
        data.map((anObjectMapped, index) => {
            return(<GalleryItem
                key={index}
                id={anObjectMapped["id"]}
                name={anObjectMapped["name"]}
                status={anObjectMapped["status"]}
                creator={anObjectMapped["creator"]}
                thumbnail={anObjectMapped["thumbnail"]}
                link={anObjectMapped["link"]}
            />)
        })
    );
}

export default function Gallery(props) {
    return (
        <Flex
            justify="center"
            bg="primary.50"
            direction={{ base: "column", md: "row" }}
            p={8}
        >
            <SimpleGrid columns={{base:"1",md:"2", lg:"3"}} spacing={8} align="center">
                {
                    (props.gridData==='')
                    ? SkeletonGrid(21)
                    : <GalleryData data={props.gridData} />
                }
            </SimpleGrid>
        </Flex>
    );
}