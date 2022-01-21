import * as React from 'react';
import { Card, Button, Typography } from '@mui/material';
import { CardActions, CardContent } from '@mui/material';

const CampaignCard = (props) => {
    const address = Object.keys(props.campaign)[0];
    const data = props.campaign[address];
    return (
        <Card sx={{ border:'1px solid gray', margin: '10px'}}>
            <CardContent>
                <Typography gutterBottom variant='h6' component='div'> {data[1]} </Typography>
                <Typography variant='subtitle1' color='text.secondary'> {data[2]} </Typography>
                <Typography variant='subtitle2' color='text.secondary'> &nbsp; </Typography>
                <Typography variant='subtitle2' color='text.secondary'> Owner: {data[0]} </Typography>
                <Typography variant='subtitle2' color='text.secondary'> Money Raised: {data[3]} </Typography>
                <Typography variant='subtitle2' color='text.secondary'> Contributors: {data[6]} </Typography>
                <Typography variant='subtitle2' color='text.secondary'> Approvers: {data[7]} </Typography>
                <Typography variant='subtitle2' color='text.secondary'> Approval Amount: {data[4]} </Typography>
                <Typography variant='subtitle2' color='text.secondary'> Request Voting Percentage: {data[5]} </Typography>
                <Typography variant='subtitle2' color='text.secondary'> Contract Address: {address} </Typography>
            </CardContent>
                <CardActions>
                    <Button size='small'>View Campaign</Button>
                </CardActions>
        </Card>
    );
}

export default CampaignCard; 