/*
 * @Description: 
 * @Version: 2.0
 * @Author: Zhiqing Zhong
 * @Date: 2023-02-04 01:02:34
 * @LastEditors: Zhiqing Zhong
 * @LastEditTime: 2023-02-04 02:03:32
 */
// controllers/bootcamp.controller.js

// Handles the business Logic
const translatorLogsModel = require("../models/TranslatorLogs.js");

const translatorLogsController = {
    getAllLogs: async () => await translatorLogsModel.getAllLogs(),
    getAllTags: async () => await translatorLogsModel.getAllTags(),

    addLogsToDB: async ({ text, translation, tags }) => {

        const response = await translatorLogsModel.addLogsToDB({ text, translation, tags });

        // if something goes wrong, send an error message
        if (response.error) {
            return {
                error: response.error,
            };
        }

        // if adding a user is successful
        return { message: "Successfully added translator logs to Notion" };
    },
};

module.exports = translatorLogsController;
