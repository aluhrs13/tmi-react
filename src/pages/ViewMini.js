/* eslint-disable eqeqeq */
import React from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { withRouter } from "react-router-dom";

//Global Sections
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

//Local Sections
import MiniGallery from "../components/sections/MiniGallery";
import DisplayMini from "../components/ui/DisplayMini";

class ViewMini extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: "",
            loadingNewPage: true,
        };
    }

    //On initial load, get the standard browse page
    componentDidMount() {
        this.GetResults();
    }

    //Make a request to get the browse data
    GetResults() {
        var baseUrl = `https://theminiindex.com/api/minis/view?id=${this.props.match.params.id}`;
        //var baseUrl = `https://localhost:44386/api/minis/view?id=28077`; //${this.state.page}`;

        axios.get(baseUrl).then(({ data }) => {
            this.setState({
                gridData: data.relatedMinis,
                numResults: data.relatedMinis.length,
                loadingNewPage: false,
            });
        });
    }

    render() {
        return (
            <>
                <Header />
                <Flex direction={{ base: "column", lg: "column" }}>
                    <Flex
                        bg="primary.50"
                        direction="column"
                        w="100%"
                        p={8}
                        align="center"
                    >
                        <DisplayMini />
                        <Box w={{ base: "100%", lg: "80%" }}>
                            <Heading size="lg" my={3}>
                                Similar Minis
                            </Heading>

                            {this.state.gridData == "" &&
                            !this.state.loadingNewPage ? (
                                <Box>
                                    Sorry, couldn't find any similar minis
                                </Box>
                            ) : (
                                <MiniGallery
                                    gridData={this.state.gridData}
                                    gallerySize={4}
                                />
                            )}
                        </Box>
                    </Flex>
                </Flex>
                <Footer />
            </>
        );
    }
}

export default withRouter(ViewMini);
