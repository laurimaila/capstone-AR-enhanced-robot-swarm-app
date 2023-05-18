import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export function SourceInput() {
    return (
        <Grid container spacing={2} >
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1},
            }}
            noValidate
            autoComplete="off"
        >

                <Grid item xs={6} >
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
                </Grid>
                <Item>Top-right corner
                    <div>
                        <TextField
                            label="Source x2"
                            id="sx2"
                            defaultValue="x2"
                            size="small"
                            style = {{width: 100}}
                        />
                        <TextField
                            label="Source y2"
                            id="sy2"
                            defaultValue="y2"
                            size="small"
                            style = {{width: 100}}
                        />
                    </div>
                </Item>
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
        </Grid>
    );
}