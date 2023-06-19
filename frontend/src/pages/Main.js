import React, { useRef, useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InfoBox from './Infobox';
import TransformAcc from './TransformAcc';
import "./Main.css";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

const PerspT = require('perspective-transform');


const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
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
function getCursorPosition(canvas, event, mouse) {
    const rect = canvas.getBoundingClientRect()
    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top
    console.log("x: " + mouse.x + " y: " + mouse.y)
    return (mouse)

}



const drawPlane = (ctx, target) => {
    ctx.strokeStyle = "#D40000"
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(target.x1, target.y1)
    ctx.lineTo(target.x2, target.y2)
    ctx.lineTo(target.x4, target.y4)
    ctx.lineTo(target.x3, target.y3)
    ctx.lineTo(target.x1, target.y1)
    ctx.stroke()
}

const drawPoint= (ctx, point) => {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(point.x, point.y, 75, 20)
    ctx.fillStyle = '#000000'
    ctx.fillText((point.x.toFixed(0)+", "+point.y.toFixed(0)), point.x + 15, point.y + 13)
    ctx.fillStyle = '#FF00FF'
    ctx.beginPath()
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
    ctx.fill()
}

const drawLabel = (ctx, singeRobotData, robotName, perspT) => {
    const coords = perspT.transform(singeRobotData.pose.position.x, singeRobotData.pose.position.y)

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
    const { robotData, perspT, targetPlane, ...rest } = props
    const canvasRef = useRef(null)
    const [mouse, setMouse] = useState({x:0, y:0})



    useEffect(() => {
        if (robotData != null) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            let animationFrameId
            canvas.addEventListener('mousedown', function (e) {
                setMouse(getCursorPosition(canvas, e, mouse))
            })

            const draw = (ctx, robotData) => {



                ctx.clearRect(0, 0, 854, 480)

                drawPlane(ctx, targetPlane)
                for (let i = 0; i < robotData.length; i++) {
                    if (robotData[i] != null) {
                        drawLabel(ctx, robotData[i], `Robot${i + 1}`, perspT)
                    }
                    // else { console.log("no robot data") }
                }
                drawPoint(ctx, mouse)

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
    }, [robotData, perspT, targetPlane])



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
    const [imgSource, setImgSource] = useState("/arena-480x360.jpg");
    const [sourcePlane, setSourcePlane] = useState({ "x1": 1.09, "y1": 0, "x2": 1.06, "y2": 5.10, "x3": 5.10, "y3": 4.68, "x4": 5.36, "y4": 1.15 })
    const [targetPlane, setTargetPlane] = useState({ "x1": 60, "y1": 62, "x2": 500, "y2": 54, "x3": 617, "y3": 311, "x4": 143, "y4": 391 })
    let perspT = PerspT([sourcePlane.x1, sourcePlane.y1, sourcePlane.x2, sourcePlane.y2, sourcePlane.x3, sourcePlane.y3, sourcePlane.x4, sourcePlane.y4], [targetPlane.x1, targetPlane.y1, targetPlane.x2, targetPlane.y2, targetPlane.x3, targetPlane.y3, targetPlane.x4, targetPlane.y4]);


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
                    <Canvas robotData={robotData} perspT={perspT} targetPlane={targetPlane} />
                </div>
                <div className={"videoelem"}>
                    <img src={imgSource} width={854} height={480} alt="video of robots" />
                </div>

            </div>


                {robotData && robotData.map((singleRobotData, i) => <InfoBox singleRobotData={singleRobotData} robotName={`Robot${i + 1}`} index={i} key={i} />)}

                {/*
                <Grid item xs={4}>
                    <Item>Turtle 03<SwitchLabels /></Item>
                </Grid>
                */}
                <Grid item xs={12} >
                <Item >

                    <TextField
                        label="Camera / Image Source"
                        id="cam"
                        value={imgSource}
                        size="small"
                        onChange={e => setImgSource(e.target.value)}

                        style={{ width: 400 }}
                    />

                </Item>
            </Grid>

            <Grid item xs={12} >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Source points (Coordinates on the arena in meters)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 2 },
                                my: 3,
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Grid container spacing={1} marginBottom={2} alignItems="center">

                                <Grid item xs={6} >
                                    <Item >Top-left corner

                                        <TextField
                                            label="Source x1"
                                            id="sx1"
                                            value={sourcePlane.x1}
                                            onChange={e => {
                                                setSourcePlane({
                                                    ...sourcePlane,
                                                    x1: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                        <TextField
                                            label="Source y1"
                                            id="sy1"
                                            value={sourcePlane.y1}
                                            onChange={e => {
                                                setSourcePlane({
                                                    ...sourcePlane,
                                                    y1: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />

                                    </Item>
                                </Grid>
                                <Grid item xs={6}   >
                                    <Item>Top-right corner

                                        <TextField
                                            label="Source x2"
                                            id="sx2"
                                            value={sourcePlane.x2}
                                            onChange={e => {
                                                setSourcePlane({
                                                    ...sourcePlane,
                                                    x2: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                        <TextField
                                            label="Source y2"
                                            id="sy2"
                                            value={sourcePlane.y2}
                                            onChange={e => {
                                                setSourcePlane({
                                                    ...sourcePlane,
                                                    y2: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />

                                    </Item>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6} >
                                    <Item>Bottom-left corner
                                        <TextField
                                            label="Source x3"
                                            id="sx3"
                                            value={sourcePlane.x3}
                                            onChange={e => {
                                                setSourcePlane({
                                                    ...sourcePlane,
                                                    x3: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                        <TextField
                                            label="Source y3"
                                            id="sy3"
                                            value={sourcePlane.y3}
                                            onChange={e => {
                                                setSourcePlane({
                                                    ...sourcePlane,
                                                    y3: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} >
                                    <Item>
                                        Bottom-right corner
                                        <TextField
                                            label="Source x4"
                                            id="sx4"
                                            value={sourcePlane.x4}
                                            onChange={e => {
                                                setSourcePlane({
                                                    ...sourcePlane,
                                                    x4: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                        <TextField
                                            label="Source y4"
                                            id="sy4"
                                            value={sourcePlane.y4}
                                            onChange={e => {
                                                setSourcePlane({
                                                    ...sourcePlane,
                                                    y4: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Target points (Coordinates on the image in pixels)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box
                            component="form"
                            mb={6}
                            sx={{
                                '& .MuiTextField-root': { m: 2 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Grid container spacing={1} marginBottom={2} alignItems="center">
                                <Grid item xs={6} >
                                    <Item>Top-left corner

                                        <TextField
                                            label="Target x1"
                                            id="tx1"
                                            value={targetPlane.x1}
                                            onChange={e => {
                                                setTargetPlane({
                                                    ...targetPlane,
                                                    x1: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                        <TextField
                                            label="Target y1"
                                            id="ty1"
                                            value={targetPlane.y1}
                                            onChange={e => {
                                                setTargetPlane({
                                                    ...targetPlane,
                                                    y1: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />

                                    </Item>
                                </Grid>
                                <Grid item xs={6} >
                                    <Item>Top-right corner

                                        <TextField
                                            label="Target x2"
                                            id="tx2"
                                            value={targetPlane.x2}
                                            onChange={e => {
                                                setTargetPlane({
                                                    ...targetPlane,
                                                    x2: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                        <TextField
                                            label="Target y2"
                                            id="ty2"
                                            value={targetPlane.y2}
                                            onChange={e => {
                                                setTargetPlane({
                                                    ...targetPlane,
                                                    y2: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />

                                    </Item>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6} >
                                    <Item>Bottom-left corner
                                        <TextField
                                            label="Target x3"
                                            id="tx3"
                                            value={targetPlane.x3}
                                            onChange={e => {
                                                setTargetPlane({
                                                    ...targetPlane,
                                                    x3: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                        <TextField
                                            label="Target y3"
                                            id="ty3"
                                            value={targetPlane.y3}
                                            onChange={e => {
                                                setTargetPlane({
                                                    ...targetPlane,
                                                    y3: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} >
                                    <Item>
                                        Bottom-right corner
                                        <TextField
                                            label="Target x4"
                                            id="tx4"
                                            value={targetPlane.x4}
                                            onChange={e => {
                                                setTargetPlane({
                                                    ...targetPlane,
                                                    x4: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                        <TextField
                                            label="Target y4"
                                            id="ty4"
                                            value={targetPlane.y4}
                                            onChange={e => {
                                                setTargetPlane({
                                                    ...targetPlane,
                                                    y4: e.target.value
                                                });
                                            }}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>
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