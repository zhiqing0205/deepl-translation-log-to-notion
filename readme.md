<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Zhiqing Zhong
 * @Date: 2023-02-07 13:23:53
 * @LastEditors: Zhiqing Zhong
 * @LastEditTime: 2023-02-07 15:11:51
-->

[脚本地址](https://greasyfork.org/zh-CN/scripts/459564-deepl%E7%BF%BB%E8%AF%91%E8%AE%B0%E5%BD%95%E5%90%8C%E6%AD%A5%E8%87%B3notion)


# 说明

这是一个基于`fastify`的`nodejs`服务器，用于将脚本发送过来的数据发送到`notion`的数据库中。
需要配合[脚本](https://greasyfork.org/zh-CN/scripts/459564-deepl%E7%BF%BB%E8%AF%91%E8%AE%B0%E5%BD%95%E5%90%8C%E6%AD%A5%E8%87%B3notion)使用。
需要有`nodejs`环境。

# 配置
在`.env`中配置`notion`的`token`和`database_id`。
## 获取notion token
我们需要设置一个集成，通过Notion API连接你的数据库，然后生成一个访问令牌来访问Notion的API。

要设置你的第一个集成，请前往[Notion API](https://www.notion.so/my-integrations)文档页面，点击右上角的我的集成按钮。点击`+`创建新的集成按钮。

![20230207145143](http://cdn.ziuch.cn/vs/20230207145143.png)

给你的集成取个名字。我们将称我们的为 "deep-translation-log"。然后点击提交。现在，你会看到你的内部集成令牌。这是你将使用的令牌来访问你的数据库。请确保将其保存在安全的地方，因为你将无法再次查看它。

## 获取 database_id
在`notion`中创建一个页面，并建立table, 需要至少包含Text，Translation，Tags三个字段

![20230207145330](http://cdn.ziuch.cn/vs/20230207145330.png)

然后在[web端](https://www.notion.so/)打开该页面，复制url中的`database_id`，如下图所示
![20230207150311](http://cdn.ziuch.cn/vs/20230207150311.png)

# 使用
```shell
npm install
node server.js
```