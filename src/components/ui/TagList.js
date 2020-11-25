import React, { Component } from "react";
import { Flex, Heading, Text, Box, Divider, Link, Tag } from "@chakra-ui/react";

const TagCategoryEnum = [
    "Gender",
    "Race",
    "Genre",
    "Use",
    "Size",
    "Alignment",
    "Creature Type",
    "Creature Name",
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
/*
const TagStatusEnum = [
    "Pending",
    "Approved",
    "Rejected",
    "Ignored",
    "Deleted",
    "Unindexed",
];
*/
function listTagsByCategoryName(Tags, TagCategory, delimiter) {
    return Tags.filter(
        (tag) => TagCategoryEnum[tag.category] === TagCategory
    ).map((selectedTag, TagIndex) => {
        return (
            <Tag m={2} px={4} py={1} variant="solid" colorScheme="primary">
                {selectedTag.tagName}
            </Tag>
        );
    });
}

function TrioColumn(props) {
    var items = listTagsByCategoryName(props.tags, props.category, false);

    return (
        <Box w={"33%"} align="center" verticalAlign="top">
            <Heading size="md" fontWeight="bold">
                {props.category}
            </Heading>
            {items.length > 0 ? (
                items
            ) : (
                <Link color="primary.500">No Tag :(</Link>
            )}
        </Box>
    );
}

function SoloColumn(props) {
    var totalElementCount = 0;

    var element = (
        <>
            <Divider m={2} borderColor="black" />
            <Heading size="md">{props.title}</Heading>
            <Flex align="left" direction="column">
                {props.categories.map((category, index) => {
                    var items = listTagsByCategoryName(
                        props.tags,
                        category,
                        true
                    );

                    totalElementCount = totalElementCount + items.length;

                    if (items.length > 0) {
                        return (
                            <Text>
                                <strong>{category}</strong>
                                {items}
                            </Text>
                        );
                    } else {
                        return <></>;
                    }
                })}
            </Flex>
        </>
    );

    if (totalElementCount > 0) {
        return element;
    } else {
        return <></>;
    }
}

function TrioCategory(props) {
    return (
        <>
            <Divider m={2} borderColor="black" />
            <Heading size="lg">{props.title}</Heading>
            <Flex direction="row" align="center" verticalAlign="top">
                <TrioColumn tags={props.tags} category={props.categories[0]} />
                <TrioColumn tags={props.tags} category={props.categories[1]} />
                <TrioColumn tags={props.tags} category={props.categories[2]} />
            </Flex>
        </>
    );
}

export default class TagList extends Component {
    render() {
        return (
            <Box m={4}>
                {/* 
                <Flex direction="row" align="center">
                    <Heading size="md">Book - </Heading>
                    {listTagsByCategoryName("SourceBook", true)}
                    {listTagsByCategoryName("BookSection", false)}
                </Flex>
                */}

                <TrioCategory
                    tags={this.props.tags}
                    title="Tag Overview"
                    categories={["Genre", "Use", "Scale"]}
                />

                <TrioCategory
                    tags={this.props.tags}
                    title="Player Character Tags"
                    categories={["Race", "Gender", "Class"]}
                />

                <SoloColumn
                    tags={this.props.tags}
                    title="Additional Model Info"
                    categories={["Weapon", "Armor", "Clothing", "Size"]}
                />

                <SoloColumn
                    tags={this.props.tags}
                    title="Suggested Uses"
                    categories={["Purpose", "Creature Name", "Creature Type"]}
                />

                <SoloColumn
                    tags={this.props.tags}
                    title="Suggested Locations"
                    categories={["Location"]}
                />

                <SoloColumn
                    tags={this.props.tags}
                    title="Helpful Search Tags"
                    categories={[null, "OtherDescription", "Alignment"]}
                />
            </Box>
        );
    }
}
