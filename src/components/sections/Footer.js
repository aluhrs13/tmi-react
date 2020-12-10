import React from "react";
import { Heading, Divider, Text, Flex } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Flex
            bg="primary.800"
            p={8}
            spacing={100}
            direction="column"
            color="white"
        >
            <Heading as="h3" size="l">
                Welcome to TMI Beta
            </Heading>
            <Divider m={2} />
            <Text>
                Right now only the core experiences work, but some of the
                functionality is better than the main site. This is a complete
                re-write of the front-end, so it'll take us a while to get
                everything. Please send any feedback (good, bad, whatever) using
                the "Send Feedback" button at the top of the page. We'll be
                using that feedback to decide what to bring over to the new
                version first.
            </Text>
        </Flex>
    );
}
