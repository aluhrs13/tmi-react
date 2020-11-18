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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            {...rest}
        >
            <Link as={RouterLink} to={href} color="primary.50">
                <div align="center">
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
                desc="The future can be even brighter but a goal without a plan is just a wish"
                href="/minis/add"
            />
            <Feature
                title="Tag it"
                img=""
                desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process"
                href="/help"
            />
            <Feature
                title="Find Minis"
                img=""
                desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process"
                href="/minis"
            />
        </Flex>
    );
}
