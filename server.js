/*
 * @Description: 
 * @Version: 2.0
 * @Author: Zhiqing Zhong
 * @Date: 2023-02-04 00:59:36
 * @LastEditors: Zhiqing Zhong
 * @LastEditTime: 2023-02-07 12:41:23
 */
const fastify = require('./routes')
fastify.listen({ port: 5010, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err
})
