import React from 'react';
import Header from './Header';
import Head from 'next/head';
import { Typography } from '@mui/material';

const Layout = (props) => {
    return (
        <div>
            <Head>
                <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'/>
                <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
            </Head>
            <Header/>
            { props.children }
            <Typography variant='subtitle2' color='text.secondary'> &nbsp; </Typography>
        </div>
    )
}

export default Layout;