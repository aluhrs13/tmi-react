import React from "react";
import { Flex } from "@chakra-ui/react";

//Global Sections
import Header from "../sections/Header";
import Footer from "../sections/Footer";

//Local Sections
import Hero from "../sections/index/Hero";
import Details from "../sections/index/Details";

export default function IndexLayout(props) {
    return (
        <>
            <Header />
            <Flex
                bg="primary.50"
                direction="column"
                align="center"
                m="0 auto"
                {...props}
            >
                <Hero />
                <Details />
            </Flex>
            <Footer />
        </>
    );
}
