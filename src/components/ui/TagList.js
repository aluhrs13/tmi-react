import React, { Component } from "react";
import {
    Flex,
    Heading,
    Text,
    Box,
    Divider,
    Link,
    Tag,
    TagLabel,
    TagLeftIcon,
} from "@chakra-ui/react";
import { TimeIcon, DeleteIcon } from "@chakra-ui/icons";
/*
import {
    GiBodyHeight,
    GiAges,
    GiShirt,
    GiKnapsack,
    GiRosaShield,
    GiBroadsword,
    GiTreasureMap,
    GiBookCover,
    GiBookmarklet,
    GiRollingDices,
    GiWomanElfFace,
    GiSwordman,
    GiSwordwoman,
} from "react-icons/gi";
*/
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
const TagCategoryIconEnum = [
    <GiSwordwoman />,
    <GiWomanElfFace />,
    <GiRollingDices />,
    "Use",
    <GiBodyHeight />,
    "Alignment",
    "Creature Type",
    "Creature Name",
    "Class",
    <GiBroadsword />,
    <GiRosaShield />,
    <GiShirt />,
    <GiTreasureMap />,
    <GiKnapsack />,
    "Purpose",
    <GiAges />,
    <GiBookCover />,
    <GiBookmarklet />,
];

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
        switch (selectedTag.status) {
            case 0:
                return (
                    <Tag
                        m={2}
                        px={4}
                        py={1}
                        variant="solid"
                        colorScheme="yellow"
                    >
                        <TagLeftIcon as={TimeIcon} />
                        <TagLabel>{selectedTag.tagName}</TagLabel>
                    </Tag>
                );

            case 1:
                return (
                    <Tag
                        m={2}
                        px={4}
                        py={1}
                        variant="solid"
                        backgroundColor="primary.700"
                    >
                        {selectedTag.tagName}
                    </Tag>
                );

            case 2:
            case 3:
            case 4:
                return <></>;

            default:
                return (
                    <Tag
                        m={2}
                        px={4}
                        py={1}
                        variant="solid"
                        backgroundColor="primary.700"
                    >
                        {selectedTag.tagName}
                    </Tag>
                );
        }
    });
}

function RemovedColumn(props) {
    var items = props.tags
        .filter(
            (tag) => tag.status === 2 || tag.status === 3 || tag.status === 4
        )
        .map((selectedTag, TagIndex) => {
            return selectedTag.tagName;
        });

    if (items.length > 0) {
        return (
            <>
                <Divider borderColor="black" my={4} />
                <Heading size="md">{props.title}</Heading>
                <Box>
                    {items.map((selectedTag, TagIndex) => {
                        return (
                            <Tag
                                m={2}
                                px={4}
                                py={1}
                                variant="solid"
                                backgroundColor="red.800"
                                color="white"
                            >
                                <TagLeftIcon as={DeleteIcon} />
                                <TagLabel>{selectedTag}</TagLabel>
                            </Tag>
                        );
                    })}
                </Box>
            </>
        );
    } else {
        return <></>;
    }
}

function TrioColumn(props) {
    var items = listTagsByCategoryName(props.tags, props.category, false);

    return (
        <Box w={"33%"} align="center">
            <Heading size="sm" fontWeight="bold">
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
            <Divider borderColor="black" my={4} />
            <Heading size="md" mt={4}>
                {props.title}
            </Heading>
            <Flex align="left" direction="column">
                {props.categories.map((category, index) => {
                    var items = listTagsByCategoryName(
                        props.tags,
                        category,
                        true
                    );

                    totalElementCount = totalElementCount + items.length;

                    if (items.length > 0) {
                        return <Text>{items}</Text>;
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
            <Divider borderColor="black" my={4} />
            <Heading size="lg" mt={4}>
                {props.title}
            </Heading>
            <Flex direction="row" align="center" alignItems="top">
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
            <Box>
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

                <RemovedColumn tags={this.props.tags} title="Removed Tags" />

                <Box align="right">
                    Something look wrong?&nbsp;
                    <Link
                        href={
                            "https://theminiindex.com/Minis/Edit?id=" +
                            this.props.miniId
                        }
                        rel="noopener"
                        target="_blank"
                    >
                        Tag this mini
                    </Link>
                </Box>
            </Box>
        );
    }
}
