import * as React from 'react';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Link, AppBar, Container, Toolbar, Typography, Button} from '@mui/material';


const Header = () => {
    return (
        <AppBar color='primary' position='static'>
            <Container maxWidth='lg'>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        <Link href='/' color='inherit' variant='inherit' underline='none' >
                            &sdot;&sdot;&sdot;&nbsp;&nbsp;CRYPTO KNIGHT&nbsp;&nbsp;&sdot;&sdot;&sdot;
                        </Link>
                    </Typography>
                    <Button href='/newCampaign' color='primary' variant='contained' disableElevation startIcon={<AddSharpIcon />}>
                        Create Campaign
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;