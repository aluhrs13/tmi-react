/* eslint-disable eqeqeq */
import React from "react";
import {
    Flex,
    Box,
    Heading,
    AlertDescription,
    AlertTitle,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { withRouter } from "react-router-dom";

//Global Sections
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

//Local Sections
import MiniGallery from "../components/sections/MiniGallery";
import DisplayMini from "../components/ui/DisplayMini";
import SkeletonMini from "../components/ui/SkeletonMini";

class ViewMini extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMini: "",
            gridData: "",
            loadingMiniData: true,
            loadingErrorCode: "",
            loadingErrorMessage: "",
        };
    }

    //When clicking a related mini, reset props and update results
    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                loadingMiniData: true,
                gridData: "",
                selectedMini: "",
            },
            () => {
                this.GetResults();
            }
        );
    }

    //On initial load, get the standard browse page
    componentDidMount() {
        this.GetResults();
    }

    //Make a request to get the Mini's data
    GetResults() {
        var baseUrl = `https://theminiindex.com/api/minis/view?id=${this.props.match.params.id}`;
        //var baseUrl = `https://localhost:44386/api/minis/view?id=28077`; //${this.state.page}`;

        axios
            .get(baseUrl)
            .then(({ data }) => {
                this.setState({
                    selectedMini: data,
                    gridData: data.relatedMinis,
                    numResults: data.relatedMinis.length,
                    loadingMiniData: false,
                });
            })
            .catch((error) => {
                var errorCode = "";
                var errorMessage = "";

                if (error.response) {
                    errorMessage = error.response.data.title;
                    errorCode = error.response.status;
                } else if (error.request) {
                    errorMessage = error.request.ToString();
                    errorCode = "-1";
                } else {
                    errorMessage = "Error" + error.message;
                    errorCode = "-1";
                }

                this.setState({
                    loadingMiniData: false,
                    loadingErrorCode: errorCode,
                    loadingErrorMessage: errorMessage,
                });
            });
    }

    render() {
        return (
            <>
                <Header />
                <Flex direction={{ base: "column", lg: "column" }}>
                    {this.state.loadingErrorCode != "" ? (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle mr={2}>
                                {this.state.loadingErrorCode}&nbsp;Error Loading
                                Mini
                            </AlertTitle>
                            <AlertDescription>
                                {this.state.loadingErrorMessage}
                            </AlertDescription>
                        </Alert>
                    ) : (
                        ""
                    )}
                    <Flex
                        bg="primary.50"
                        direction="column"
                        w="100%"
                        p={8}
                        align="center"
                    >
                        {this.state.selectedMini != "" &&
                        !this.state.loadingMiniData ? (
                            <DisplayMini miniData={this.state.selectedMini} />
                        ) : (
                            <SkeletonMini />
                        )}

                        <Box w={{ base: "100%", lg: "80%" }}>
                            <Heading size="lg" my={3}>
                                Similar Minis
                            </Heading>

                            {this.state.gridData == "" &&
                            !this.state.loadingMiniData ? (
                                <Box>
                                    Sorry, couldn't find any similar minis
                                </Box>
                            ) : (
                                <MiniGallery
                                    gridData={this.state.gridData}
                                    gallerySize={5}
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
