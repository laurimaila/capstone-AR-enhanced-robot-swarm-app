import React, { useRef, useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function TransformAcc(initSource, initTarget) {

    const [source, setSource] = useState(initSource);
    const [target, setTarget] = useState(initTarget);
    return (
        <div>
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
                                        value={source.x1}
                                        onChange={e => {
                                            setSource({
                                                ...source,
                                                x1: e.target.value
                                            });
                                        }}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Source y1"
                                        id="sy1"
                                        value={source.y1}
                                        onChange={e => {
                                            setSource({
                                                ...source,
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
                                        value={source.x2}
                                        onChange={e => {
                                            setSource({
                                                ...source,
                                                x2: e.target.value
                                            });
                                        }}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Source y2"
                                        id="sy2"
                                        value={source.y2}
                                        onChange={e => {
                                            setSource({
                                                ...source,
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
                                        value={source.x3}
                                        onChange={e => {
                                            setSource({
                                                ...source,
                                                x3: e.target.value
                                            });
                                        }}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Source y3"
                                        id="sy3"
                                        value={source.y3}
                                        onChange={e => {
                                            setSource({
                                                ...source,
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
                                        value={source.x4}
                                        onChange={e => {
                                            setSource({
                                                ...source,
                                                x4: e.target.value
                                            });
                                        }}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Source y4"
                                        id="sy4"
                                        value={source.y4}
                                        onChange={e => {
                                            setSource({
                                                ...source,
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
                                        value={target.x1}
                                        onChange={e => {
                                            setTarget({
                                                ...target,
                                                x1: e.target.value
                                            });
                                        }}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Target y1"
                                        id="ty1"
                                        value={target.y1}
                                        onChange={e => {
                                            setTarget({
                                                ...target,
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
                                        value={target.x2}
                                        onChange={e => {
                                            setTarget({
                                                ...target,
                                                x2: e.target.value
                                            });
                                        }}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Target y2"
                                        id="ty2"
                                        value={target.y2}
                                        onChange={e => {
                                            setTarget({
                                                ...target,
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
                                <Item>Bottom-right corner
                                    <TextField
                                        label="Target x3"
                                        id="tx3"
                                        value={target.x3}
                                        onChange={e => {
                                            setTarget({
                                                ...target,
                                                x3: e.target.value
                                            });
                                        }}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Target y3"
                                        id="ty3"
                                        value={target.y3}
                                        onChange={e => {
                                            setTarget({
                                                ...target,
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
                                    Bottom-left corner
                                    <TextField
                                        label="Target x4"
                                        id="tx4"
                                        value={target.x4}
                                        onChange={e => {
                                            setTarget({
                                                ...target,
                                                x4: e.target.value
                                            });
                                        }}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Target y4"
                                        id="ty4"
                                        value={target.y4}
                                        onChange={e => {
                                            setTarget({
                                                ...target,
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
        </div>
    );
}


