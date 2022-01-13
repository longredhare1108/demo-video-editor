import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    return (
        <React.Fragment>
            <Title>Start Course</Title>
            <Typography component="p" variant="h4">
                Intro to Dance
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 January, 2022
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View Courses
                </Link>
            </div>
        </React.Fragment>
    );
}
