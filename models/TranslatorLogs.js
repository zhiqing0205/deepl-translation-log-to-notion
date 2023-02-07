// This file contains code to make operations on the DB
const notion = require("../services/notion");
const translatorLogsDatabaseId = process.env.NOTION_DATABASE_ID;
const mailingListDatabaseId = process.env.NOTION_MAILING_LIST_ID;
const translatorLogsModel = {
    // list all the courses in the DB
    getAllLogs: async () => {
        console.log("Getting all logs from Notion");
        try {
            const { results } = await notion.databases.query({
                database_id: translatorLogsDatabaseId,
            });
            // console.log('results: ', results)
            const res = results.map((page) => {
                console.log(results)
                return {
                    pageId: page.id,
                    videoURL: page.properties["YouTube Video"].url,
                    title: page.properties.Name.title[0].plain_text,
                    tags: page.properties.Tags.multi_select.map((tag) => tag.name),
                    summary: page.properties.Summary.rich_text[0].plain_text,
                    author: page.properties.Author.rich_text[0].plain_text,
                    startDate: page.properties.Date.date.start,
                    endDate: page.properties.Date.date.end,
                };
            });
            return res;
        } catch (error) {
            console.error(error);
        }
    },
    getAllTags: async () => {
        console.log('getALLTags')
        try {
            // const { results } = await notion.databases.query({
            //     database_id: translatorLogsDatabaseId,
            // });
            const results = await notion.databases.retrieve({
                database_id: translatorLogsDatabaseId,
            });
            console.log('results: ', results)
            let tags = results.properties.Tags.multi_select.options
            console.log('tags: ', tags)

            let res = []
            // results.map((page) => {
            //     console.log('results: ', results)
            //     page.properties.Tags.multi_select.map((tag) => {
            //         console.log('tag: ', tag)
            //         res.push(tag.name)
            //     })
            // });
            // console.log('res: ', res)
            return tags;
        } catch (error) {
            console.error(error);
        }
    },
    addLogsToDB: async ({ text, translation, tags }) => {
        console.log("Adding logs to Notion");
        console.log("text: ", text);
        console.log("translation: ", translation);
        try {
            const res = await notion.pages.create({
                parent: {
                    database_id: translatorLogsDatabaseId,
                },
                properties: {
                    "Text": {
                        title: [
                            {
                                text: { content: text, link: null },
                                plain_text: text,
                            },
                        ],
                    },
                    "Translation": {
                        "rich_text": [
                            {
                                "text": {
                                    "content": translation
                                }
                            }
                        ]
                    },
                    "Tags": {
                        // "multi_select": [
                        //     {
                        //         "name": "🥬 Vegetable",
                        //     },
                        // ]
                        "multi_select": tags
                    },
                    // "Translation": {
                    //     multi_select: [
                    //         {
                    //             name: translation,
                    //         },
                    //     ],
                    // },
                },
            });
            console.log("res: ", res);
            return res;
        } catch (error) {
            return {
                error: "Failed to add logs to Notion",
            };
        }
    },
};

module.exports = translatorLogsModel;