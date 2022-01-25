import * as React from 'react';
import { Card, Button, Typography, CardActions, CardContent } from '@mui/material';
import CardTypography from './CardTypography';

const CampaignCard = (props) => {
    const address = Object.keys(props.campaign)[0];
    const data = props.campaign[address];
    return (
        <Card sx={{margin: '20px'}}>
            <CardContent>
                <Typography gutterBottom variant='h6'> {data[1]} </Typography>
                <Typography variant='subtitle1' color='text.primary'> {data[2]} </Typography>
                <Typography variant='subtitle2' color='text.secondary'> &nbsp; </Typography>
                <CardTypography title='Owner:' text={data[0]}/>
                <CardTypography title='Money Raised:' text={data[3]}/>
                <CardTypography title='Contributors:' text={data[6]}/>
                <CardTypography title='Approvers:' text={data[7]}/>
                <CardTypography title='Approval Amount:' text={data[4]}/>
                <CardTypography title='Request Voting Percentage:' text={data[5]}/>
                <CardTypography title='Contract Address:' text={address}/>
            </CardContent>
            <CardActions>
                <Button size='medium'>View Campaign</Button>
            </CardActions>
        </Card>
    );
}

export default CampaignCard; 