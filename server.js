const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models')

const app = express()
const port = 3000

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Sequelize Connected
sequelize.sync({ force: false })
    .then(() => console.log("Connected to MySQL"))
    .catch(err => console.error(err))

// Routers


// port 3000
app.listen(port, () => console.log("Server is running on port ", port))