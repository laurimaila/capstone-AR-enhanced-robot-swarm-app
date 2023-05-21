import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import { common } from "@mui/material/colors";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography  variant="h6" color={common.white} gutterBottom>
              Team VolunTIERS
            </Typography>
            <Typography variant="body2" color={common.white}>
              Capstone Project for Turku Intelligent Embedded & Robotic Systems (TIERS) Lab
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color={common.white} gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color={common.white}>
              Email:
            </Typography>
          </Grid>
          {/*
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
          */}
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color={common.white} align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://tiers.utu.fi/">
              VolunTIERS
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}