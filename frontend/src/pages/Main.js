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


function SwitchLabels() {
    return (
        <FormGroup>
            <FormControlLabel control={<Switch defaultChecked />} label="Show data" />
        </FormGroup>
    );
}

const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, 640, 480)

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(320 + 100 * Math.sin(frameCount * 0.02) * 2, 370 + 25 * Math.cos(frameCount * 0.02) * 2, 75, 20)
    ctx.fillStyle = '#000000'
    ctx.fillText('Turtle_01', 340 + 100 * Math.sin(frameCount * 0.02) * 2, 383 + 25 * Math.cos(frameCount * 0.02) * 2)
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    ctx.arc(320 + 100 * Math.sin(frameCount * 0.02) * 2, 380 + 25 * Math.cos(frameCount * 0.02) * 2, 10, 0, 2 * Math.PI)
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
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas ref={canvasRef} {...rest} />
}


export default function Main() {
    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ my: 2, zIndex: 8, border: 1, width: '100%', display: "flex", justifyContent: 'center' }}>
                        <Canvas draw={draw}
                            className="canvas" />
                        <video className="video" controls muted
                            autoPlay>
                            <source src="http://localhost:4000/video" type="video/mp4"></source>

                        </video></Box>
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