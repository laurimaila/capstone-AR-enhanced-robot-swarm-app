import React, { useRef, useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./Main.css";
import UpdatePos from './updatePos.js';
import * as UI from './UI-elements.js';
import InfoBox from './Infobox';
//import Image from 'mui-image'

const robot1 = { "name": "Turtle01", "x": 350, "y": 300, "battery": 88 }
const robot2 = { "name": "Turtle02", "x": 150, "y": 250, "battery": 60 }






function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}
const Canvas = props => {

    const { draw, ...rest } = props
    const canvasRef = useRef(null)




    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId
        canvas.addEventListener('mousedown', function (e) {
            getCursorPosition(canvas, e)
        })


        const render = () => {
            frameCount++
            UpdatePos(robot1, frameCount, 3)
            UpdatePos(robot2, frameCount, 4)
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

export default Canvas