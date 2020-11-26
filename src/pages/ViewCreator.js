import React from "react";
import { Flex, Center, Heading, Skeleton, Text, Box } from "@chakra-ui/react";
import axios from "axios";

//Global Sections
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";

//Local Sections
import MiniGallery from "../components/sections/MiniGallery";
import LoadingButton from "../components/ui/LoadingButton";
import DisplayCreatorInfo from "../components/ui/DisplayCreatorInfo";

export default class ViewCreator extends React.Component {
    constructor(props) {
        super(props);
        this.PageUp = this.PageUp.bind(this);
        this.state = {
            creatorData: "",
            gridData: "",
            numResults: "",
            page: 1,
            loadingNewPage: true,
        };
    }

    //On initial load, get the standard browse page
    componentDidMount() {
        this.GetCreatorData();
        this.GetMiniResults();
    }

    //Make a request to get the browse data
    GetMiniResults() {
        var baseUrl = `https://theminiindex.com/api/minis/search?pageIndex=${this.state.page}&creatorId=${this.props.match.params.id}`;
        //var baseUrl = `https://localhost:44386/api/minis/search?pageIndex=${this.state.page}&creatorId=${this.props.match.params.id}`;

        axios.get(baseUrl).then(({ data }) => {
            if (this.state.page > 1) {
                this.setState({
                    gridData: this.state.gridData.concat(data),
                    numResults: data.length,
                    loadingNewPage: false,
                });
            } else {
                this.setState({
                    gridData: data,
                    numResults: data.length,
                    loadingNewPage: false,
                });
            }
        });
    }

    GetCreatorData() {
        var baseUrl = `https://theminiindex.com/api/creators/view?id=${this.props.match.params.id}`;
        //var baseUrl = `https://localhost:44386/api/creators/view?id=${this.props.match.params.id}`;

        axios.get(baseUrl).then(({ data }) => {
            this.setState({
                creatorData: data,
            });
        });
    }

    PageUp() {
        this.setState(
            { page: parseInt(this.state.page) + 1, loadingNewPage: true },
            function () {
                this.GetMiniResults();
            }
        );
    }

    render() {
        return (
            <>
                <Header />
                <Flex direction="column" bg="primary.100">
                    {this.state.creatorData !== "" ? (
                        <DisplayCreatorInfo
                            creatorInfo={this.state.creatorData}
                        />
                    ) : (
                        <Box mt={8} mx={16}>
                            <Skeleton w={"40%"}>
                                <Heading>Name</Heading>
                                <Text>Buttons</Text>
                            </Skeleton>
                        </Box>
                    )}

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
