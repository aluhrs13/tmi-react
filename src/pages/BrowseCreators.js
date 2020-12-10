import React from "react";
import { Flex, Center, Box, Heading } from "@chakra-ui/react";
import axios from "axios";

//Global Sections
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

//Local Sections
import CreatorGallery from "../components/sections/CreatorGallery";
import LoadingButton from "../components/ui/LoadingButton";

export default class BrowseCreators extends React.Component {
    constructor(props) {
        super(props);
        this.PageUp = this.PageUp.bind(this);
        this.state = {
            gridData: "",
            numResults: "",
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
        var baseUrl = `https://theminiindex.com/api/creators/browse?pageIndex=${this.state.page}`;
        //var baseUrl = `https://localhost:44386/api/creators/browse?pageIndex=${this.state.page}`;

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

    PageUp() {
        this.setState(
            { page: parseInt(this.state.page) + 1, loadingNewPage: true },
            function () {
                this.GetResults();
            }
        );
    }

    render() {
        return (
            <>
                <Header />
                <Box bg="primary.100" w={"100%"} px={16} py={8}>
                    <Heading size="xl">All Creators</Heading>
                </Box>
                <Flex
                    bg="primary.50"
                    direction="column"
                    w={"100%"}
                    align="center"
                >
                    <CreatorGallery gridData={this.state.gridData} />
                    <Center>
                        <LoadingButton
                            isLoading={this.state.loadingNewPage}
                            numResults={this.state.numResults}
                            pageUp={this.PageUp}
                        />
                    </Center>
                </Flex>
                <Footer />
            </>
        );
    }
}
