import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export function SourceInput(source) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2},
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2} alignItems="center">

            <Grid item xs={12} >
                <Item>
                    <Typography variant="h6" gutterBottom 	>
                        Source points (Arena coordinates)
                    </Typography>
                </Item>
            </Grid>
            <Grid item xs={6} >
                <Item>Top-left corner

                        <TextField
                            label="Source x1"
                            id="sx1"
                            defaultValue={source.x1}
                            size="small"
                            style = {{width: 100}}
                        />
                        <TextField
                            label="Source y1"
                            id="sy1"
                            defaultValue={source.y1}
                            size="small"
                            style = {{width: 100}}
                        />

                </Item>
            </Grid>
            <Grid item xs={6} >
                <Item>Top-right corner

                        <TextField
                            label="Source x2"
                            id="sx2"
                            defaultValue={source.x2}
                            size="small"
                            style = {{width: 100}}
                        />
                        <TextField
                            label="Source y2"
                            id="sy2"
                            defaultValue={source.y2}
                            size="small"
                            style = {{width: 100}}
                        />

                </Item>
            </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={6} >
                <Item>Bottom-right corner
                    <TextField
                        label="Source x3"
                        id="sx3"
                        defaultValue={source.x3}
                        size="small"
                        style = {{width: 100}}
                    />
                    <TextField
                        label="Source y3"
                        id="sy3"
                        defaultValue={source.y3}
                        size="small"
                        style = {{width: 100}}
                    />
                </Item>
            </Grid>
            <Grid item xs={6} >
                <Item>
                    Bottom-left corner
                    <TextField
                        label="Source x4"
                        id="sx4"
                        defaultValue={source.x4}
                        size="small"
                        style = {{width: 100}}
                    />
                    <TextField
                        label="Source y4"
                        id="sy4"
                        defaultValue={source.y4}
                        size="small"
                        style = {{width: 100}}
                    />
                </Item>
            </Grid>
            </Grid>
        </Box>

    );
}



export function TargetInput(target) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2},
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2} alignItems="center">

                <Grid item xs={12} >
                    <Item>
                        <Typography variant="h6" gutterBottom 	>
                            Target points (Image coordinates)
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={6} >
                    <Item>Top-left corner

                        <TextField
                            label="Target x1"
                            id="sx1"
                            defaultValue={target.x1}
                            size="small"
                            style = {{width: 100}}
                        />
                        <TextField
                            label="Target y1"
                            id="sy1"
                            defaultValue={target.y1}
                            size="small"
                            style = {{width: 100}}
                        />

                    </Item>
                </Grid>
                <Grid item xs={6} >
                    <Item>Top-right corner

                        <TextField
                            label="Target x2"
                            id="sx2"
                            defaultValue={target.x2}
                            size="small"
                            style = {{width: 100}}
                        />
                        <TextField
                            label="Target y2"
                            id="sy2"
                            defaultValue={target.y2}
                            size="small"
                            style = {{width: 100}}
                        />

                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <Item>Bottom-right corner
                        <TextField
                            label="Target x3"
                            id="sx3"
                            defaultValue={target.x3}
                            size="small"
                            style = {{width: 100}}
                        />
                        <TextField
                            label="Target y3"
                            id="sy3"
                            defaultValue={target.y3}
                            size="small"
                            style = {{width: 100}}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6} >
                    <Item>
                        Bottom-left corner
                        <TextField
                            label="Target x4"
                            id="sx4"
                            defaultValue={target.x4}
                            size="small"
                            style = {{width: 100}}
                        />
                        <TextField
                            label="Target y4"
                            id="sy4"
                            defaultValue={target.y4}
                            size="small"
                            style = {{width: 100}}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>

    );
}