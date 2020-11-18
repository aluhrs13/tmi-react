import React from "react";
import { Flex, Center } from "@chakra-ui/react";
import axios from "axios";

//Global Sections
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

//Local Sections
import MiniGallery from "../components/sections/MiniGallery";
import Search from "../components/ui/Search";
import LoadingButton from "../components/ui/LoadingButton";

export default class BrowseMinis extends React.Component {
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
        //var baseUrl = `https://localhost:44386/api/minis/search?pageIndex=${this.state.page}`;

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
                        <MiniGallery
                            w={{ base: "100%", lg: "80%" }}
                            gridData={this.state.gridData}
                            gallerySize={21}
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
