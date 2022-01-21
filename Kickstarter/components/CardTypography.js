import React from "react";
import { Typography } from "@mui/material";

const CardTypography = (props) => {
    return (
        <div>
            <Typography variant='subtitle2' sx={{display: 'inline-block', color: '#1565c0'}}> {props.title} &nbsp; </Typography>
            <Typography variant='subtitle2' color='text.secondary' sx={{ display: 'inline-block' }}> {props.text} </Typography>
        </div>
    );
}

export default CardTypography;