const express = require('express')
const api = express.Router()
const { Data } = require('../services/database.js')

const PAGE_PER_PAGE = 10

api.get('/messages', (req, res) => {
    const { receiver, page = 1 } = req.query
    if (!receiver) return res.sendStatus(400)

    const skip = (page - 1) * PAGE_PER_PAGE
    const limit = PAGE_PER_PAGE

    Data.aggregate([
        { $match: { receiver: receiver.toLowerCase() } },
        { $project: { receiver: 0, _id: 0, __v: 0 } },
        { $sort: { createdAt: -1 } },
        {
            $facet: {
                totalCount: [{ $count: "totalCount" }],
                datas: [{ $skip: skip }, { $limit: limit }],
            },
        },
        { $set: { totalCount: { $first: "$totalCount" } } },
        { $set: { totalCount: '$totalCount.totalCount' } },
    ])
        .then(e => e[0])
        .then(({ totalCount = 0, datas }) => {
            res.send({
                receiver,
                meta: {
                    page: Number(page),
                    perPage: PAGE_PER_PAGE,
                    pageCount: Math.ceil(totalCount / PAGE_PER_PAGE),
                    totalCount,
                },
                datas
            })
        })
        .catch(() => res.sendStatus(400))

})

api.post('/create', (req, res) => {
    Data.create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
})


module.exports = api

