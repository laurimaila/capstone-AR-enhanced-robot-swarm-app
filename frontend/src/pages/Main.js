import React, { useRef, useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
//import FormGroup from '@mui/material/FormGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Switch from '@mui/material/Switch';
import * as UI from './UI-elements.js';
import InfoBox from './Infobox';
//import Image from 'mui-image'
import "./Main.css";

const PerspT = require('perspective-transform');

const sourcePlane = { "x1": 1.09, "y1": 0, "x2": 1.06, "y2": 5.10, "x3": 5.10, "y3": 4.68, "x4": 5.36, "y4": 1.15 };
const targetPlane = { "x1": 60, "y1": 62, "x2": 500, "y2": 54, "x3": 617, "y3": 311, "x4": 143, "y4": 391 };


const srcCorners = [sourcePlane.x1, sourcePlane.y1, sourcePlane.x2, sourcePlane.y2, sourcePlane.x3, sourcePlane.y3, sourcePlane.x4, sourcePlane.y4];
const dstCorners = [targetPlane.x1, targetPlane.y1, targetPlane.x2, targetPlane.y2, targetPlane.x3, targetPlane.y3, targetPlane.x4, targetPlane.y4];
const perspT = PerspT(srcCorners, dstCorners);


/*
function SwitchLabels() {

    const [checked, setChecked] = useState(false);

    const switchHandler = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <FormGroup>
            <FormControlLabel control={<Switch checked={checked} onChange={switchHandler} />} label="Show data" />
        </FormGroup>
    );
}
*/


function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}



const drawPlane = (ctx, target) => {
    ctx.strokeStyle = "#D40000"
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(target.x1, target.y1)
    ctx.lineTo(target.x2, target.y2)
    ctx.lineTo(target.x3, target.y3)
    ctx.lineTo(target.x4, target.y4)
    ctx.lineTo(target.x1, target.y1)
    ctx.stroke()
}

const drawLabel = (ctx, singeRobotData, robotName) => {
    const coords = perspT.transform(singeRobotData.pose.position.x, singeRobotData.pose.position.y)
    //const xcoord = singeRobotData.pose.position.x * 100
    //const ycoord = singeRobotData.pose.position.y * 100

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(coords[0], coords[1] - 10, 75, 50)
    ctx.fillStyle = '#000000'
    ctx.fillText(robotName, coords[0] + 20, coords[1] + 3)
    ctx.fillText(singeRobotData.pose.position.x.toFixed(2), coords[0] + 20, coords[1] + 18)
    ctx.fillText(singeRobotData.pose.position.y.toFixed(2), coords[0] + 20, coords[1] + 30)
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    ctx.arc(coords[0], coords[1], 10, 0, 2 * Math.PI)
    ctx.fill()
}


const Canvas = props => {
    const { robotData, ...rest } = props
    const canvasRef = useRef(null)


    useEffect(() => {
        if (robotData != null) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            let animationFrameId
            canvas.addEventListener('mousedown', function (e) {
                getCursorPosition(canvas, e)
            })

            const draw = (ctx, robotData) => {



                ctx.clearRect(0, 0, 854, 480)

                drawPlane(ctx, targetPlane)
                for (let i = 0; i < robotData.length; i++) {
                    if (robotData[i] != null) {
                        drawLabel(ctx, robotData[i], `Robot${i + 1}`)
                    }
                    else { console.log("no robot data") }
                }


            }

            const renderCanv = () => {
                draw(context, robotData)
                animationFrameId = window.requestAnimationFrame(renderCanv)
            }

            renderCanv()

            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
        }
    }, [robotData])




    return <canvas ref={canvasRef} width={854} height={480} {...rest} />
}

/*
<Box sx={{ my: 2, zIndex: 8, border: 1, width: 1, display: "flex", justifyContent: 'center' }}>
                        <Canvas draw={draw}
                            width="640"
                            height="480"
                            className="canvas" />
                        <video controls muted
                            width="640"
                            height="480"
                            autoPlay>
                            <source src="http://localhost:4000/video" type="video/mp4"></source>

                        </video>
                    </Box>
*/


export default function Main() {

    const [robotData, setRobotData] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:3005/test')
                .then(response => response.json())
                .then(data => setRobotData(data))

        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container maxWidth="md">
            <div className={"videocont"}>

                <div className={"canvaselem"}>
                    <Canvas robotData={robotData} />
                </div>
                <div className={"videoelem"}>
                    <img src={"/arena-480x360.jpg"} width={854} height={480} alt="video of robots" />
                </div>

            </div>
            <Grid container spacing={2}>
                {robotData && robotData.map((singleRobotData, i) => <InfoBox singleRobotData={singleRobotData} robotName={`Robot${i + 1}`} index={i} key={i} />)}

                {/*
                <Grid item xs={4}>
                    <Item>Turtle 03<SwitchLabels /></Item>
                </Grid>
*/}
                <Grid item xs={12} >
                    {UI.SourceInput(sourcePlane)}
                </Grid>
                <Grid item xs={12} >
                    {UI.TargetInput(targetPlane)}
                </Grid>
            </Grid>
        </Container>
    );
}

/*

<Box sx={{ my: 2, zIndex: 4, display: 'flex', justifyContent: 'center' }}>
                        <Canvas2 className="canvas2" sx={{ zIndex: 6}}/>
                        <Canvas robotData={robotData} className="canvas" sx={{ zIndex: 9}}/>
                    </Box>
<Grid item xs={4} >
                    <Item>{robot1.name}
                    <Item> x = {robot1.x} /  y = {robot1.y}</Item>
                    <Item> Battery = {robot1.battery} %</Item>
                    </Item>

                </Grid>

*/