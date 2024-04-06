require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT
const routes = require('./routes/routes')
const connDB = require('./configs/connection')
const cors = require('cors')
app.use(cors())
// Serve static files to react
app.use(express.static(path.resolve(__dirname,"client","build")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('', routes)
const startServer = async () => {
    try {
        await connDB()
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}
startServer()