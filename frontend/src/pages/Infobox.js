import React, { useRef, useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import * as UI from './UI-elements.js';

const Item = styled(Paper)(({ theme }) => ({
 //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

const InfoBox = ({singleRobotData, robotName, index}) => {
    if(singleRobotData != null){
    return (
        <Grid item xs={4} >
            <Item>{robotName}
                <Item> x = {singleRobotData.pose.position.x.toFixed(2)} /  y = {singleRobotData.pose.position.y.toFixed(2)}</Item>
                <Item> Battery = {44+(13*index)} %</Item>
            </Item>
        </Grid>);
    }
};

export default InfoBox;