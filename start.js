const express = require('express')
const socket = require('socket.io')

const port = process.env.PORT || 5000

app = express()

    .get('/', (req,res) => {
        res.end("Dominoes")
    })