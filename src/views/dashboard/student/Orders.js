import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '15 Jan, 2022', 'Hip Swivel', 'Elvis Presley', 'Moves & Techniques', '7:27'),
    createData(1, '15 Jan, 2022', 'Dance Tonight', 'Paul McCartney', 'Tips & Lectures', '7:27'),
    createData(2, '15 Jan, 2022', 'Rock', 'Tom Scholz', 'Tips & Lectures', '7:27'),
    createData(3, '15 Jan, 2022', 'Moonwalk', 'Michael Jackson', 'Moves & Techniques', '7:27'),
    createData(4, '15 Jan, 2022', 'Rock', 'Bruce Springsteen', 'Tips & Lectures', '7:27'),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    return (
        <React.Fragment>
            <Title>Recent Classes</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Style</TableCell>
                        <TableCell>Instructor</TableCell>
                        <TableCell>Class Type</TableCell>
                        <TableCell align="right">Length</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell>{row.paymentMethod}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more classes
            </Link>
        </React.Fragment>
    );
}
