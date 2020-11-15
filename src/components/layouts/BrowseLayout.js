import React from "react";
import { Flex, Center } from "@chakra-ui/react";
import axios from "axios";

//Global Sections
import Header from "../sections/Header";
import Footer from "../sections/Footer";

//Local Sections
import Gallery from "../sections/Gallery";
import Search from "../sections/Search";
import LoadingButton from "../ui/LoadingButton";

export default class BrowseLayout extends React.Component {
    constructor(props) {
        super(props);
        this.SubmitForm = this.SubmitForm.bind(this);
        this.PageUp = this.PageUp.bind(this);
        this.state = {
            gridData: "",
            numResults: "",
            query: "",
            page: 1,
            loadingNewPage: true,
        };
    }

    //On initial load, get the standard browse page
    componentDidMount() {
        this.GetResults();
    }

    //Make a request to get the browse data
    GetResults() {
        var baseUrl = `https://theminiindex.com/api/minis/search?pageIndex=${this.state.page}`;
        //var baseUrl = `https://localhost:44386/api/minis/search?pageIndex=${page}`;

        if (this.state.query) {
            baseUrl += `&SearchString=${this.state.query}`;
        }

        axios.get(baseUrl).then(({ data }) => {
            if (this.state.page > 1) {
                this.setState({
                    gridData: this.state.gridData.concat(data),
                    numResults: data.length,
                });
            } else {
                this.setState({ gridData: data, numResults: data.length });
            }
            this.setState({ loadingNewPage: false });
        });
    }

    SubmitForm(newSearch) {
        this.setState(
            {
                query: newSearch,
                page: 1,
                gridData: "",
                loadingNewPage: true,
            },
            function () {
                this.GetResults();
            }
        );
    }

    PageUp() {
        this.setState(
            { page: parseInt(this.state.page) + 1, loadingNewPage: true },
            function () {
                this.GetResults();
            }
        );
    }

    render() {
        const query = this.state.query;
        console.log(this.state.numResults);
        return (
            <>
                <Header />
                <Flex
                    direction={{ base: "column", lg: "column" }}
                    align="top"
                    justify="center"
                >
                    <Search
                        w={{ base: "100%" }}
                        query={query}
                        onSearchChange={this.SubmitForm}
                    />

                    <Flex
                        justify="center"
                        bg="primary.50"
                        direction="column"
                        w="100%"
                        p={8}
                    >
                        <Gallery
                            w={{ base: "100%", lg: "80%" }}
                            gridData={this.state.gridData}
                        />
                        <Center>
                            <LoadingButton
                                isLoading={this.state.loadingNewPage}
                                numResults={this.state.numResults}
                                pageUp={this.PageUp}
                            />
                        </Center>
                    </Flex>
                </Flex>
                <Footer />
            </>
        );
    }
}
