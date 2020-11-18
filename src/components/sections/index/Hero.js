import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Heading, Stack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Hero({
    title,
    subtitle,
    image,
    ctaLink,
    ctaText,
    ...rest
}) {
    return (
        <Box
            className="hero"
            w={{ base: "100%" }}
            mb={{ base: 12, md: 0 }}
            h={600}
        >
            <Stack
                spacing={4}
                p={10}
                m={10}
                rounded={10}
                w={{ base: "70%", md: "40%" }}
                align={["center", "center", "flex-start", "flex-start"]}
                backgroundColor="#00000099"
            >
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="white"
                    textAlign={["center", "center", "left", "left"]}
                >
                    {title}
                </Heading>
                <Heading
                    as="h2"
                    size="md"
                    color="white"
                    opacity="0.8"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={["center", "center", "left", "left"]}
                >
                    {subtitle}
                </Heading>
                <Link as={RouterLink} to="/minis">
                    <Button
                        bg="primary.600"
                        border="0px"
                        color="white"
                        to={ctaLink}
                    >
                        {ctaText}
                    </Button>
                </Link>
            </Stack>
        </Box>
    );
}

Hero.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
};

Hero.defaultProps = {
    title: "Welcome to The Mini Index!",
    subtitle:
        "The Mini Index is a crowd-sourced index of various minis, terrain tiles, and scatter terrain across different websites for use with tabletop games like Dungeons and Dragons.",
    image: "%PUBLIC_URL%/5.jpg",
    ctaText: "Find the perfect mini, tiles, or scatter terrain ",
    ctaLink: "/minis",
};
