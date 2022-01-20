import React from 'react';
import Header from './Header';
import Head from 'next/head';

const Layout = (props) => {
    return (
        <div style={{margin:'-8px'}}>
            <Head>
                <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'/>
                <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
            </Head>
            <Header />
            { props.children }
        </div>
    )
}

export default Layout;