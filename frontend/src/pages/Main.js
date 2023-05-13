import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import React, { useRef, useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import "./Styles.css";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const targetPlane = {"x1":100, "y1":50, "x2":220, "y2":50, "x3":250, "y3":150, "x4":50, "y4":140};

const robot1 = {"name":"Turtle01", "x":350, "y":300};

function SwitchLabels() {
    return (
        <FormGroup>
            <FormControlLabel control={<Switch defaultChecked />} label="Show data" />
        </FormGroup>
    );
}

function GetImage() {
    let image = new Image();
    image.src = 'http://192.168.1.231/image.jpg';
    return image;
}


const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, 640, 480)
    ctx.drawImage(GetImage(), 0, 0, 640, 480)
    drawPlane(ctx, targetPlane)
    drawLabel(ctx, robot1, frameCount)


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
    ctx.fillRect(robot.x, robot.y + 10, 75, 20)
    ctx.fillStyle = '#000000'
    ctx.fillText('Turtle_01', robot.x + 20, robot.y + 10)
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    ctx.arc(robot.x, robot.y, 10, 0, 2 * Math.PI)
    ctx.fill()
}

const Canvas = props => {

    const { draw, ...rest } = props
    const canvasRef = useRef(null)




    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId


        const render = () => {
            frameCount++
            robot1.x = robot1.x + 2 * Math.sin(frameCount * 0.02)
            robot1.y = robot1.y + Math.cos(frameCount * 0.02)
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
                                className="canvas"  />

                    </Box>

                </Grid>
                <Grid item xs={4}>
                    <Item>Turtle 01<SwitchLabels /></Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>Turtle 02<SwitchLabels /></Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>Turtle 03<SwitchLabels /></Item>
                </Grid>
            </Grid>
        </Container>
    );
}