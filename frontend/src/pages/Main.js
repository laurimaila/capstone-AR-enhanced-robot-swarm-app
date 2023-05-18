import React, { useRef, useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./Styles.css";
import UpdatePos from './updatePos.js';
import * as UI from './UI-elements.js';
//import Image from 'mui-image'
import arena from './arena-480x360.jpg';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const targetPlane = {"x1":104, "y1":177, "x2":321, "y2":159, "x3":322, "y3":210, "x4":55, "y4":232};
const sourcePlane = {"x1":0, "y1":0, "x2":4, "y2":0, "x3":4, "y3":2, "x4":0, "y4":2};

const robot1 = {"name":"Turtle01", "x":350, "y":300, "battery":88}
const robot2 = {"name":"Turtle02", "x":150, "y":250, "battery":60}


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

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

const draw = (ctx, frameCount) => {
    let image = new Image()
    //image.src = "http://192.168.1.231/image.jpg?" //+ frameCount;
    image.src = "/arena-480x360.jpg";

    image.onload = function(){
            ctx.clearRect(0, 0, 640, 480)
            ctx.drawImage(image, 0, 0, 640, 480)
            drawPlane(ctx, targetPlane)
            drawLabel(ctx, robot1, frameCount)
            drawLabel(ctx, robot2, frameCount)
        }

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

const drawLabel = (ctx, robot, frameCount) => {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(robot.x, robot.y - 10, 75, 50)
    ctx.fillStyle = '#000000'
    ctx.fillText(robot.name, robot.x + 20, robot.y + 3)
    ctx.fillText(robot.x, robot.x + 20, robot.y + 18)
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    ctx.arc(robot.x, robot.y, 10, 0, 2 * Math.PI)
    ctx.fill()
}

const Canvas = props => {
    const [locations, setLocations] = React.useState([])
    const { draw, ...rest } = props
    const canvasRef = useRef(null)




    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId
        canvas.addEventListener('mousedown', function(e) {
            getCursorPosition(canvas, e)
        })


        const render = () => {
            frameCount++
            UpdatePos(robot1, frameCount)
            UpdatePos(robot2, frameCount)
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas ref={canvasRef} width={640} height={480} {...rest} />
}


export default function Main() {

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ my: 2, zIndex: 8, border: 1,  display: 'flex', justifyContent: 'center'}}>
                        <Canvas draw={draw}
                                className="canvas" sx={{zIndex: 9}}/>


                    </Box>
                </Grid>
                <Grid item xs={4} >
                    <Item>{robot1.name}
                    <Item> x = {robot1.x} /  y = {robot1.y}</Item>
                    <Item> Battery = {robot1.battery} %</Item>
                    </Item>

                </Grid>
                <Grid item xs={4}>
                        <Item>{robot2.name}
                        <Item> x = {robot2.x} /  y = {robot2.y}</Item>
                        <Item> Battery = {robot2.battery} %</Item>
                        </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>Turtle 03<SwitchLabels /></Item>
                </Grid>
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