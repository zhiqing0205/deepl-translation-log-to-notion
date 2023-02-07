/*
 * @Description: 
 * @Version: 2.0
 * @Author: Zhiqing Zhong
 * @Date: 2023-02-04 01:06:51
 * @LastEditors: Zhiqing Zhong
 * @LastEditTime: 2023-02-05 22:19:42
 */
const fastify = require("fastify")({
    logger: true,
});

// Controllers
const translatorLogsController = require("../controllers/TranslatorLogs_controller");

// Routes
fastify.get("/", async (req, reply) => {
    try {
        const res = await translatorLogsController.getAllLogs();
        reply.type("application/json").code(200);
        return { data: res };
    } catch (error) {
        reply.type("application/json").code(400);
        return { error };
    }
});

fastify.get("/tags", async (req, reply) => {
    // console.log("get tags");
    try {
        const res = await translatorLogsController.getAllTags();
        reply.type("application/json").code(200);
        return { data: res };
    } catch (error) {
        reply.type("application/json").code(400);
        return { error };
    }
});

fastify.post("/", async (req, reply) => {
    //console.log('req.body: ', req.body, typeof req.body)
    // text=123&translation=456 => { text: '123', translation: '456' }

    // 正则表达式
    const reg = /text=(.*)&translation=(.*)&tags=(.*)/;
    const str = req.body.toString();

    console.log("req.body: ", req.body);
    console.log("str: ", str);

    const result = str.match(reg);
    console.log("result: ", result);

    let text = result[1];
    let translation = result[2];
    let tags_list = JSON.parse(result[3]);
    console.log("tags_list: ", tags_list);
    let tags = []

    tags_list.forEach(tag => {
        tags.push({ 'name': tag })
    });

    console.log("tags: ", tags);

    try {
        // let text = req.body.text;
        // let translation = req.body.translation;
        // const { text, translation } = req.body;
        console.log("text: ", text);
        console.log("translation: ", translation);
        const res = await translatorLogsController.addLogsToDB({ text, translation, tags });
        reply.type("application/json").code(200);
        return { data: res };
    } catch (error) {
        reply.type("application/json").code(400);
        return { data: error };
    }
});

module.exports = fastify;