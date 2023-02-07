/*
 * @Description: 
 * @Version: 2.0
 * @Author: Zhiqing Zhong
 * @Date: 2023-02-04 00:57:59
 * @LastEditors: Zhiqing Zhong
 * @LastEditTime: 2023-02-04 00:58:02
 */
// In this file, we connect to the Notion Service
require('dotenv').config()
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_TOKEN });
module.exports = notion;