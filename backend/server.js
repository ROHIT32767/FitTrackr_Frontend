const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const connection = mongoose.connection
const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery",false)
mongoose.connect(uri,{useNewurlParser:true})
connection.once('open',()=>{
    console.log(`MongoDB Database connection Established Successfully`)
})

app.use("/exercises",require('./routes/exercises.js'))
app.use("/users",require('./routes/users.js'))

app.listen(PORT,() => console.log(`Server is listening on PORT ${PORT}`))