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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const targetPlane = {"x1":100, "y1":50, "x2":220, "y2":50, "x3":250, "y3":150, "x4":50, "y4":140};

const robot1 = {"name":"Turtle01", "x":350, "y":300, "battery":88}

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

function InputSource() {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1},
            }}
            noValidate
            autoComplete="off"
        >
            <Item>Top-left corner
            <div>
                <TextField
                    label="Source x1"
                    id="sx1"
                    defaultValue="x1"
                    size="small"
                    style = {{width: 100}}
                />
                <TextField
                    label="Source y1"
                    id="sy1"
                    defaultValue="y1"
                    size="small"
                    style = {{width: 100}}
                />
            </div>
            </Item>
            <div>
                <TextField
                    label="Source x2"
                    id="sx2"
                    defaultValue="x2"
                    size="small"
                    helperText="Top-right corner"
                    style = {{width: 100}}
                />
                <TextField
                    label="Source y2"
                    id="sy2"
                    defaultValue="y2"
                    size="small"
                    helperText="Top-right corner"
                    style = {{width: 100}}
                />
            </div>
            <div>
                <TextField
                    label="Source x3"
                    id="sx3"
                    defaultValue="x3"
                    size="small"
                    helperText="Bottom-right corner"
                    style = {{width: 100}}
                />
                <TextField
                    label="Source y3"
                    id="sy3"
                    defaultValue="y3"
                    size="small"
                    helperText="Bottom-right corner"
                    style = {{width: 100}}
                />
                <TextField
                    label="Source x4"
                    id="sx4"
                    defaultValue="x4"
                    size="small"
                    helperText="Bottom-left corner"
                    style = {{width: 100}}
                />
                <TextField
                    label="Source y4"
                    id="sy4"
                    defaultValue="y4"
                    size="small"
                    helperText="Bottom-left corner"
                    style = {{width: 100}}
                />
            </div>
        </Box>
    );
}

const draw = (ctx, frameCount, image) => {
    ctx.clearRect(0, 0, 640, 480)
    ctx.drawImage(image, 0, 0, 640, 480)
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

    const { draw, ...rest } = props
    const canvasRef = useRef(null)




    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        function GetImage() {
            let image = new Image();
            image.src = "http://192.168.1.231/image.jpg";
            return image;
        }

        const render = () => {
            frameCount++
            UpdatePos(robot1, frameCount)
            setInterval(function(){
            draw(context, frameCount, GetImage())
            },1000/15);
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
                <Grid item xs={4} >
                    <Item>{robot1.name}
                    <Item> x = {robot1.x} /  y = {robot1.y}</Item>
                    <Item> Battery = {robot1.battery} %</Item>
                    </Item>

                </Grid>
                <Grid item xs={4}>
                    <Item>Turtle 02<SwitchLabels /></Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>Turtle 03<SwitchLabels /></Item>
                </Grid>
                <Grid item xs={6} >
                    {InputSource()}
                </Grid>
            </Grid>
        </Container>
    );
}