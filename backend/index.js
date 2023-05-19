const express = require('express');
const serveStatic = require('serve-static')
const ROSLIB = require('roslib');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
// For streamer fs and path
const fs = require('fs');
const path = require('path');
const { connected } = require('process');

const app = express();

var robotData = [
    null, null, null, null, null,
    null, null, null, null, null
];

var topicList = [];

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.use(helmet());
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development') {
  app.use(cors());
  app.use(morgan('dev'));
} else {
    app.use(serveStatic('dist', { index: ['index.html', 'index.htm'] }));
}

const WEBSOCKET_PORT = 9090;

const ros = new ROSLIB.Ros({ url: `ws://localhost:${WEBSOCKET_PORT}` });

getTopics().then(response => {
    topicList = response;
    console.log("List of topics:", topicList);
});

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
};

ros.on("connection", () => {
    console.log("Connected to rosbridge server.");
});

ros.on("error", (error) => {
    console.log(`Error connecting to rosbridge server: ${error}`);
    setTimeout(() => {
        ros.connect(`ws://localhost:${WEBSOCKET_PORT}`);
    }, "5000");
});

ros.on("close", () => {
    console.log("Disconnected from rosbridge server.");
    setTimeout(() => {
        ros.connect(`ws://localhost:${WEBSOCKET_PORT}`);
    }, "5000");
});

app.get('/all', (req, res) => {
    res.send(robotData);
});

app.get('/1', (req, res) => {
    res.send(robotData[0]);
});

app.get('/2', (req, res) => {
    res.send(robotData[1]);
});

app.get('/3', (req, res) => {
    res.send(robotData[2]);
});

app.get('/4', (req, res) => {
    res.send(robotData[3]);
});

app.get('/5', (req, res) => {
    res.send(robotData[4]);
});

const robot1listener = new ROSLIB.Topic({
    ros,
    name: "/vrpn_client_node/turtle1/pose",
    messageType: "geometry_msgs/msg/PoseStamped",
});

const robot2listener = new ROSLIB.Topic({
    ros,
    name: "/vrpn_client_node/turtle2/pose",
    messageType: "geometry_msgs/msg/PoseStamped",
});

const robot3listener = new ROSLIB.Topic({
    ros,
    name: "/vrpn_client_node/turtle3/pose",
    messageType: "geometry_msgs/msg/PoseStamped",
});

const robot4listener = new ROSLIB.Topic({
    ros,
    name: "/vrpn_client_node/turtle4/pose",
    messageType: "geometry_msgs/msg/PoseStamped",
});


const robot5listener = new ROSLIB.Topic({
    ros,
    name: "/vrpn_client_node/turtle5/pose",
    messageType: "geometry_msgs/msg/PoseStamped",
});


robot1listener.subscribe((message) => {
    robotData[0] = message;

});

robot2listener.subscribe((message) => {
    robotData[1] = message;
});

robot3listener.subscribe((message) => {
    robotData[2] = message;
});

robot4listener.subscribe((message) => {
    robotData[3] = message;
});

robot5listener.subscribe((message) => {
    robotData[4] = message;
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