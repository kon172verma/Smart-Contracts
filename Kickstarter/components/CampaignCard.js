import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export default function CampaignCard() {
    return (
        <Card sx={{ border:'1px solid gray', margin: '10px', display:'flex' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant='h5' component='div'>
            Lizard
            </Typography>
            <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            </Typography>
            <CardActions>
                <Button size='small'>View Campaign</Button>
            </CardActions>
        </CardContent>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://mui.com/static/images/cards/live-from-space.jpg"
                alt="Live from space album cover"
            />
        </Card>
    );
}
