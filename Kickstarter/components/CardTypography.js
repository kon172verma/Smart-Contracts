import React from "react";
import { Typography } from "@mui/material";

const CardTypography = (props) => {
    return (
        <div>
            <Typography variant={props.value} sx={{display: 'inline-block', color: '#1565c0'}}> {props.title} &nbsp; </Typography>
            <Typography variant={props.value} color='text.secondary' sx={{ display: 'inline-block' }}> {props.text} </Typography>
        </div>
    );
}

export default CardTypography;