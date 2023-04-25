
const express = require('express');
const ROSLIB = require('roslib');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
// For streamer fs and path
const fs = require('fs');
const path = require('path');


const WEBSOCKET_PORT = 3005;

const ros = new ROSLIB.Ros({ url: `ws://localhost:${WEBSOCKET_PORT}` });

var robotData = [
    {},
    {}
]

var topicList = [];


const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

function getTopics() {
    return new Promise((resolve, reject) => {

        var topicsClient = new ROSLIB.Service({
            ros: ros,
            name: '/rosapi/topics',
            serviceType: 'rosapi/Topics'
        });

        var request = new ROSLIB.ServiceRequest({});

        topicsClient.callService(
            request,
            response => {
                var data = response.topics;
                resolve(data);
            },
            err => {
                console.error("getTopics err:", err);
                reject(err);
            }
        );
    });
}



getTopics().then(response => {
    topicList = response;
});

console.log(topicList)



app.get('/', (req, res) => {
    console.log("topicit", topicsList)
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
    console.log('ROS: Listening on port 3000');
});

// Video streamer on port 4000

const streamer = express();

streamer.get('/video', (req, res) => {
    res.sendFile('Robots-640x480.mp4', { root: __dirname });
});

streamer.listen(4000, () => {
    console.log('Video: Listening on port 4000')
});