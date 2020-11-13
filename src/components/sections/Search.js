import React, { Component } from "react"
import { Stack, Box, Heading, Input, IconButton } from "@chakra-ui/core";

export default class Search extends Component{
    constructor(props){
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {query:''}
    }

    handleFormSubmit(event) {
        event.preventDefault()
        this.props.onSearchChange(this.search.value);
    }

    render() {
        return (
            <Box
                bg="primary.100"
                p={8}
            >
                <Heading
                    as="h2"
                >
                    Find Minis
                </Heading>
                    <form onSubmit={this.handleFormSubmit}>
                        <Stack direction="row" width="100%" justify="center">
                            <Input
                                variant="outline"
                                ref={input => this.search = input}
                                width="80%"
                                placeholder="Search"
                            />
                            <IconButton bg="primary.800" color="white" border="0px" aria-label="Search database" icon="search" type="submit" />
                        </Stack>
                    </form>
            </Box>
        );
    }
}