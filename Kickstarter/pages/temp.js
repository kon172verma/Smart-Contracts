import React from 'react';
import {Button} from '@mui/material';

class SomeClass extends React.Component{
    state={
        someState: false
    }
    handleClick = async(someValue) => {
        this.setState({ someState: true });
        // await someAsyncFunction(someValue);
        console.log(someValue);
    }
    render(){
        return(
            <Button onClick={async()=>{await this.handleClick(12)}}>
                Click me.!
            </Button>
        )
    }
}

export default SomeClass;