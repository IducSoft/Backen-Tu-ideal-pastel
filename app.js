const express = require("express")
const process = require("process")
const dotenv = require("dotenv");

const cors = require("cors")

const {json} = require("body-parser")

const axios = require("axios")

const app = express();

const PORT =  process.env.PORT || 7000;

// const PORT =  7000;

app.use(cors())
app.use(json())

const {parsed: config} = dotenv.config();

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/resources/image`;

const auth={

    username: config.API_KEY,
    password: config.API_SECRET
}

app.get("/", (req, res)=>{

    return res.send("funciona correctamente")
})

app.get("/mistrabajos", async (req, res)=>{

    const response = await axios.get(BASE_URL, {

        auth,
        params: {

            next_cursor: req.query.next_cursor
        }
    })

    return res.send(response.data)
})

// app.set('port', process.env.PORT || 3000);



app.listen(PORT, console.log(`server running on port ${PORT}`));

