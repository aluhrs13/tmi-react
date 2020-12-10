import React from "react";
import { Heading, Text, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MotionBox } from "../../ui/MotionBox.js";

function Feature({ title, desc, img, href, ...rest }) {
    return (
        <MotionBox
            bg="primary.800"
            rounded="md"
            w={{ base: "80%", md: "100%", lg: "100%" }}
            p={5}
            m={5}
            shadow="md"
            borderWidth="1px"
            align="center"
            {...rest}
        >
            <Link as={RouterLink} to={href} color="primary.50">
                <div align="center">
                    (Placholder Image)
                    <img src="/logo192.png" alt="Placeholder logo" />
                </div>
                <Heading fontSize="xl">{title}</Heading>
                <Text mt={4}>{desc}</Text>
            </Link>
        </MotionBox>
    );
}

export default function Details(props) {
    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            w={{ base: "80%", md: "100%", lg: "80%" }}
            m={10}
        >
            <Feature
                title="Add a Mini"
                img=""
                desc="Minis on TheMiniIndex are crowd-sourced from people like you from 9+ other model hosting websites. Just give us a link and it'll show up once someone makes sure it's appropriate."
                href="/minis/add"
            />
            <Feature
                title="Tag it"
                img=""
                desc="Once your Mini is added, it needs some tags to be easily discoverable. Things like what weapon it's using or what monster it could represent help people find just what they're looking for."
                href="/help"
            />
            <Feature
                title="Find Minis"
                img=""
                desc="Now your Mini is easy to find by much more valuable information than you could fit into the name."
                href="/minis"
            />
        </Flex>
    );
}
