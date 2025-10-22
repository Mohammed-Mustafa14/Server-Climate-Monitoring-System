const express = require('express')
const app = express()
const cors = require('cors');
const humidityRouter = require("./routes/humidity")
const temperatureRouter = require("./routes/temperature")

const port = 5000;
const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,DELETE',
    optionsSuccessStatus: 200 
};

app.use(express.json());

//set entrypoint
app.get('/')

// define the routes
app.use('/humidity', cors(corsOptions), humidityRouter);
app.use('temperature', cors(corsOptions), temperatureRouter)

app.listen(port, () => {console.log("server listening on port 5000")})