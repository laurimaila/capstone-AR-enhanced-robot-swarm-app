import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
//import "./Footer.css";
const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "primary.light",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography color="common.white" variant="subtitle1">
                            {`Capstone team VolunTIERS | ${new Date().getFullYear()}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;