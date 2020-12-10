import React from "react";
import Logo from "../ui/Logo";
import LogoType from "../ui/LogoType";
import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const MenuItems = (props) => {
    return (
        <Link
            mt={{ base: 2, md: 2 }}
            mb={{ base: 0, md: 2 }}
            mr={6}
            padding={2}
            display="block"
            as={RouterLink}
            to={props.href}
            color="white"
        >
            {props.children}
        </Link>
    );
};

const Header = (props) => {
    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="5px 10px 5px 10px"
            bg="primary.800"
            color="white"
            {...props}
        >
            <Flex align="center" mr={5}>
                <Link as={RouterLink} to="/">
                    <Logo height="40px" width="40px" />
                </Link>
                <LogoType />
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                <svg
                    fill="white"
                    width="25px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </Box>

            <Box
                display={{ base: show ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
            >
                <MenuItems href="/minis">Minis</MenuItems>
                <MenuItems href="/creators">Creators</MenuItems>

                {/*
                //TODO: Add these
                <Link href="https://theminiindex.com/Minis/Help?beta=true">
                    RandTagCheck
                </Link>
                <MenuItems href="/starred">Starred</MenuItems>
                <MenuItems href="/help">Tag a Mini</MenuItems>
                <MenuItems href="/minis/add">Add a Mini</MenuItems>
                <MenuItems href="/feedback">Feedback</MenuItems>
                */}
            </Box>

            <Box
                display={{ base: show ? "block" : "none", md: "block" }}
                mt={{ base: 4, md: 0 }}
            >
                <Link href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAYEBbR1UQkY1NUNNUVZVVjdJQ0NTU1JUWDNTQ05FNS4u">
                    <Button bg="red.300" border="0px" color="black">
                        Send Feedback
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
};

export default Header;
