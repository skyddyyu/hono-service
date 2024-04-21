import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import prisma from "../lib/prisma";
import dayjs from "dayjs";

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})
app.get('/hello', (c) => {
    return c.json({hello: 'hono'})
})

app.post('/record', async (c) => {
    const body = await c.req.json();
    const record = await prisma.record.create({
        data: {...body, createTime: dayjs()}
    })
    console.log('请求接受到的数据：', body)
    console.log('保存的数据：', record)
    return c.json({
        tip: '接收到的数据',
        data: body,
    })
})

const port = 5000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
