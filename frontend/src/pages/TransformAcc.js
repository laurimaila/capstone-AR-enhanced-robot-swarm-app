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

export default function TransformAcc({ sourcePlane, targetPlane, handleSource, handleTarget }) {

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
                                        value={sourcePlane.x1}
                                        onChange={handleSource}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Source y1"
                                        id="sy1"
                                        value={sourcePlane.y1}
                                        onChange={handleSource}
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
                                        onChange={handleSource}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Source y2"
                                        id="sy2"
                                        value={sourcePlane.y2}
                                        onChange={handleSource}
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
                                        onChange={handleSource}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Source y3"
                                        id="sy3"
                                        value={sourcePlane.y3}
                                        onChange={handleSource}
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
                                        onChange={handleSource}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Source y4"
                                        id="sy4"
                                        value={sourcePlane.y4}
                                        onChange={handleSource}
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
                                        onChange={handleTarget}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Target y1"
                                        id="ty1"
                                        value={targetPlane.y1}
                                        onChange={handleTarget}
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
                                        onChange={handleTarget}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Target y2"
                                        id="ty2"
                                        value={targetPlane.y2}
                                        onChange={handleTarget}
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
                                        value={targetPlane.x3}
                                        onChange={handleTarget}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Target y3"
                                        id="ty3"
                                        value={targetPlane.y3}
                                        onChange={handleTarget}
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
                                        value={targetPlane.x4}
                                        onChange={handleTarget}
                                        size="small"
                                        style={{ width: 100 }}
                                    />
                                    <TextField
                                        label="Target y4"
                                        id="ty4"
                                        value={targetPlane.y4}
                                        onChange={handleTarget}
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


