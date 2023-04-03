const ROSLIB = require('roslib');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const WEBSOCKET_PORT = 3002;

const ros = new ROSLIB.Ros({ url: `ws://localhost:${WEBSOCKET_PORT}` });

let turtledata = [
    {},
    {}
]



const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));



app.get('/', (req, res) => {

    res.send(turtledata);
});

app.get('/turtle3', (req, res) => {
    res.send(turtledata[0]);
});

app.get('/turtle4', (req, res) => {
    res.send(turtledata[1]);
});

app.get('/distance', (req, res) => {
    let distance = Math.sqrt((turtledata[1].pose.position.x - turtledata[0].pose.position.x) ** 2
    + (turtledata[1].pose.position.y - turtledata[0].pose.position.y) ** 2);
    res.send(JSON.stringify(distance));
});

ros.on("connection", () => {
    console.log("Connected to rosbridge server.");
});

ros.on("error", (error) => {
    console.log(`errored out ${error}`);
});

ros.on("close", () => {
    console.log("Disconnected from rosbridge server.");
});

const turtle3listener = new ROSLIB.Topic({
    ros,
    name: "/vrpn_client_node/turtle3/pose",
    messageType: "geometry_msgs/msg/PoseStamped",
});

const turtle4listener = new ROSLIB.Topic({
    ros,
    name: "/vrpn_client_node/turtle4/pose",
    messageType: "geometry_msgs/msg/PoseStamped",
});


turtle3listener.subscribe((message) => {
    turtledata[0] = message;
});

turtle4listener.subscribe((message) => {
    turtledata[1] = message;
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

