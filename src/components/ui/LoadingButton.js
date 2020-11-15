import React, { Component } from "react";
import { Button, Spinner } from "@chakra-ui/react";

export default class LoadingButton extends Component {
    handlePageUp = () => {
        this.props.pageUp();
    };

    render() {
        //This is ugly with ternary
        //If we're loading, show a spinner.
        //If we aren't loading, show a "Load more..." button or no results string
        //TODO - Handle when number of results is exactly a factor of 21
        return this.props.isLoading ? (
            <Spinner size="xl" m={8} color="primary.500" />
        ) : this.props.numResults > 0 ? (
            this.props.numResults % 21 !== 0 ? (
                ""
            ) : (
                <Button
                    onClick={this.handlePageUp}
                    m={4}
                    w={"80%"}
                    bg="primary.800"
                    color="white"
                >
                    Load more...
                </Button>
            )
        ) : (
            "Search returned no results"
        );
    }
}
