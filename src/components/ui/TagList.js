import React, { Component } from "react";
import { Flex, Heading, Text, Box, Divider } from "@chakra-ui/react";

export default class TagList extends Component {
    constructor(props) {
        super(props);
        this.TagCategoryEnum = [
            "Gender",
            "Race",
            "Genre",
            "Use",
            "Size",
            "Alignment",
            "CreatureType",
            "CreatureName",
            "Class",
            "Weapon",
            "Armor",
            "Clothing",
            "Location",
            "OtherDescription",
            "Purpose",
            "Scale",
            "SourceBook",
            "BookSection",
        ];

        this.TagStatusEnum = [
            "Pending",
            "Approved",
            "Rejected",
            "Ignored",
            "Deleted",
            "Unindexed",
        ];
    }

    //TODO Refactor this into a component
    listTagsByCategoryName(TagCategory, delimiter) {
        return this.props.tags
            .filter((tag) => this.TagCategoryEnum[tag.category] === TagCategory)
            .map((selectedTag, TagIndex) => {
                return (
                    <Text>
                        {selectedTag.tagName + (delimiter ? ",\xa0" : "")}
                    </Text>
                );
            });
    }

    //TODO - This doesn't seem to be effecient based off prints
    //TODO - Also doesn't actually work
    findCategoryByName(TagCategory) {
        console.log("CALLED ONCE");
        this.props.tags.some((tag) => {
            console.log(this.TagCategoryEnum[tag.category] + " - HIT ONCE");
            return this.TagCategoryEnum[tag.category] === TagCategory;
        });
    }

    render() {
        return (
            <Box m={4}>
                <Heading size="lg">Overview</Heading>
                <Flex direction="row" align="center" verticalAlign="top">
                    <Box w={"33%"} align="center">
                        <Heading size="md">Genre</Heading>
                        {this.listTagsByCategoryName("Genre", false)}
                    </Box>
                    <Box w={"33%"} align="center">
                        <Heading size="md">Use</Heading>
                        {this.listTagsByCategoryName("Use", false)}
                    </Box>
                    <Box w={"33%"} align="center">
                        <Heading size="md">Scale</Heading>
                        {this.listTagsByCategoryName("Scale", false)}
                    </Box>
                </Flex>

                <Flex direction="row" align="center">
                    <Heading size="md">Book - </Heading>
                    {this.listTagsByCategoryName("SourceBook", true)}
                    {this.listTagsByCategoryName("BookSection", false)}
                </Flex>

                <Divider m={2} />
                <Heading size="lg">Player Character</Heading>
                <Flex direction="row" align="center" verticalAlign="top">
                    <Box w={"50%"} align="center">
                        <Heading size="md">Race</Heading>
                        {this.listTagsByCategoryName("Race", false)}
                    </Box>
                    <Box w={"50%"} align="center">
                        <Heading size="md">Gender</Heading>
                        {this.listTagsByCategoryName("Gender", false)}
                    </Box>
                    <Box w={"50%"} align="center">
                        <Heading size="md">Class</Heading>
                        {this.listTagsByCategoryName("Class", false)}
                    </Box>
                </Flex>

                <Divider m={2} />
                <Heading size="lg">Creature / Monster</Heading>
                <Flex direction="row" align="center" verticalAlign="top">
                    <Box w={"50%"} align="center">
                        <Heading size="md">Name</Heading>
                        {this.listTagsByCategoryName("CreatureName", false)}
                    </Box>

                    <Box w={"50%"} align="center">
                        <Heading size="md">Type</Heading>
                        {this.listTagsByCategoryName("CreatureType", false)}
                    </Box>

                    <Box w={"50%"} align="center">
                        <Heading size="md">Location</Heading>
                        {this.listTagsByCategoryName("Location", true)}
                    </Box>
                </Flex>

                <Divider m={2} />
                <Heading size="md">Suggested Uses</Heading>
                <Flex direction="row" align="center">
                    {this.listTagsByCategoryName("Purpose", true)}
                </Flex>

                <Divider m={2} />
                <Heading size="md">Additional Model Info</Heading>
                <Flex direction="row" align="center">
                    {this.listTagsByCategoryName("Weapon", true)}
                    {this.listTagsByCategoryName("Armor", true)}
                    {this.listTagsByCategoryName("Clothing", true)}
                    {this.listTagsByCategoryName("Size", true)}
                </Flex>

                <Divider m={2} />
                <Heading size="md">Helpful Search Tags</Heading>
                <Flex direction="row" align="center">
                    {this.listTagsByCategoryName(null, true)}
                    {this.listTagsByCategoryName("OtherDescription", true)}
                    {this.listTagsByCategoryName("Alignment", true)}
                </Flex>
            </Box>
        );
    }
}
