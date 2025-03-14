import React, { useEffect, useState } from 'react';
import './BookingSeat.css';

import SEATSJSON from './seats.json';

export default function BookingSeat() {

    const data = SEATSJSON.data;
    const seats = data.rows[12].seats;

    const [SeatTable, setSeatTable] = useState(data);

    // const [SeatTable, setSeatTable] = useState(Array(data.maxRow).fill(0).map(() =>
    //     Array(data.maxColumn).fill(0).map(() => ({ value: 0 }))
    // ));

    // useEffect(() => {
    //     fetch("./seats.json") // Ensure this path is correct and the file is a valid JSON
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json(); // Convert data from JSON
    //         })
    //         .then((result) => setData(result))
    //         .catch((error) => console.error("Error fetching data:", error));
    // }, []);

    const [ChosenSeat, setChosenSeat] = useState([]);

    // const SeatTableExample = [
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 0],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 0],
    //     [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    //     [2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2],
    //     [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0]
    // ]

    const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const chooseSeat = (name, id) => {
        console.log(name);
        if (ChosenSeat.some(seat => seat[0] == name && seat[1] == id)) {
            setChosenSeat(prev => prev.filter(seat => seat[0] !== name || seat[1] !== id))
        } else if (ChosenSeat.length < 8) {
            setChosenSeat(prev => [...prev, [name, id]]);
        }
    }

    const checkValidSeat = () => {
        console.log(ChosenSeat);
        const SortedChosenSeat = ChosenSeat.sort((a, b) => a[1] - b[1])
        console.log(SortedChosenSeat);
    }

    return (
        <div className='bookingseat-container'>
            <p>{JSON.stringify(ChosenSeat)} - {ChosenSeat.length}</p>
            {/* <p>{JSON.stringify(data.rows[0].seats[0])}</p> */}
            {/* <p>{JSON.stringify(data.rows[0].name)}</p> */}
            {/* <p>{JSON.stringify(seats)}</p> */}
            {/* <p>{JSON.stringify(seats.row)}</p> */}
            {/* <p>{JSON.stringify(seats.col)}</p> */}
            {/* <p>ID: {data.rows.some(row => row.seats.some(item => item.row == '12' && item.column == '2')) ? data.rows.find(row => row.seats.some(item => item.row == '12' && item.column == '2'))?.seats.find(item => item.row == '12' && item.column == '2')?.id : 'Not found'}</p> */}


            <table
                className='no-wrap align-middle'
                style={{
                    // '--table-width': 0,
                    // '--table-height': 0,
                }}
            >
                {/* <tbody>
                    {[...Array(SeatTableExample.length)].map((_, index_row) => (
                        <tr key={index_row}>
                            <td className='name-row'>{Alphabet[index_row]}</td>
                            {[...Array(SeatTableExample[0].length)].map((_, index_col) => (
                                <td
                                    key={index_col}
                                    onClick={() => { chooseSeat(index_row, index_col) }}
                                    style={{
                                        paddingRight: (index_col + 1 < SeatTableExample[0].length && SeatTableExample[index_row][index_col] === 2 && SeatTableExample[index_row][index_col + 1] === 2) ? '0' : '',
                                        paddingLeft: (index_col - 1 >= 0 && SeatTableExample[index_row][index_col] === 2 && SeatTableExample[index_row][index_col - 1] === 2) ? '0' : '',
                                        visibility: SeatTableExample[index_row][index_col] === 0 ? 'hidden' : '',
                                    }}
                                >
                                    <p style={{
                                        backgroundColor:
                                            ChosenSeat.some(seat => seat[0] === index_row && seat[1] === index_col) ?
                                                '#dc3545'
                                                :
                                                (SeatTableExample[index_row][index_col] === 4 ?
                                                    '#ffc107'
                                                    :
                                                    (
                                                        SeatTableExample[index_row][index_col] === 3 ?
                                                            '#222'
                                                            :
                                                            (
                                                                SeatTableExample[index_row][index_col] === 2 ?
                                                                    '#222'
                                                                    :
                                                                    (
                                                                        SeatTableExample[index_row][index_col] === 1 ?
                                                                            '#222'
                                                                            :
                                                                            'transparent'
                                                                    )
                                                            )
                                                    )
                                                ),
                                        color: SeatTableExample[index_row][index_col] === 3 ? '#555' : '',
                                        borderColor: SeatTableExample[index_row][index_col] === 3 ? '#555' : '',

                                        borderRightWidth: (index_col + 1 < SeatTableExample[0].length && SeatTableExample[index_row][index_col] === 2 && SeatTableExample[index_row][index_col + 1] === 2) ? '0' : '',
                                        borderLeftWidth: (index_col - 1 >= 0 && SeatTableExample[index_row][index_col] === 2 && SeatTableExample[index_row][index_col - 1] === 2) ? '0' : '',

                                        borderTopRightRadius: (index_col + 1 < SeatTableExample[0].length && SeatTableExample[index_row][index_col] === 2 && SeatTableExample[index_row][index_col + 1] === 2) ?
                                            '0' : '',
                                        borderBottomRightRadius: (index_col + 1 < SeatTableExample[0].length && SeatTableExample[index_row][index_col] === 2 && SeatTableExample[index_row][index_col + 1] === 2) ?
                                            '0' : '',
                                        borderTopLeftRadius: (index_col - 1 >= 0 && SeatTableExample[index_row][index_col] === 2 && SeatTableExample[index_row][index_col - 1] === 2) ?
                                            '0' : '',
                                        borderBottomLeftRadius: (index_col - 1 >= 0 && SeatTableExample[index_row][index_col] === 2 && SeatTableExample[index_row][index_col - 1] === 2) ?
                                            '0' : '',
                                    }}>
                                        {Alphabet[index_row]}{index_col + 1}
                                    </p>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody> */}
                <tbody>
                    {[...Array(data.maxRow)].map((_, index_row) => (
                        <tr key={index_row}>
                            <td
                                className='name-row'
                                style={{
                                    visibility: data.rows.some(row => row.seats.some(item => item.row == index_row)) ?
                                        '' : 'hidden',
                                }}
                            >
                                {data.rows.some(row => row.seats.some(item => item.row == index_row)) ?
                                    data.rows.find(row => row.seats.some(item => item.row == index_row))?.name
                                    :
                                    '...'}
                            </td>
                            {/* /////////////////////////////////////////////////////////////////////////// */}
                            {[...Array(data.maxColumn)].map((_, index_col) => (
                                <td
                                    key={index_col}
                                    onClick={() => chooseSeat(data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.name, data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.id)}
                                    style={{
                                        visibility: data.rows.some(row => row.seats.some(item => item.row == index_row && item.column == index_col)) ?
                                            '' : 'hidden',

                                        paddingRight: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.area == 2 &&
                                            data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.seatsInGroup[0].column == index_col ?
                                            '0' : '',
                                        paddingLeft: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.area == 2 &&
                                            data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.seatsInGroup[1].column == index_col ?
                                            '0' : '',
                                    }}
                                >
                                    <p
                                        style={{
                                            backgroundColor: ChosenSeat.some(seat => seat[0] == data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.name && seat[1] == data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.id) ?
                                                '#dc3545' : '',
                                            color: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.status == 0 ?
                                                '#fff' : '#555',
                                            borderColor: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.status == 0 ?
                                                '#fff' : '#555',

                                            borderRightWidth: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.area == 2 &&
                                                data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.seatsInGroup[0].column == index_col ?
                                                '0' : '',
                                            borderLeftWidth: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.area == 2 &&
                                                data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.seatsInGroup[1].column == index_col ?
                                                '0' : '',

                                            borderTopRightRadius: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.area == 2 &&
                                                data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.seatsInGroup[0].column == index_col ?
                                                '0' : '',
                                            borderBottomRightRadius: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.area == 2 &&
                                                data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.seatsInGroup[0].column == index_col ?
                                                '0' : '',
                                            borderTopLeftRadius: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.area == 2 &&
                                                data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.seatsInGroup[1].column == index_col ?
                                                '0' : '',
                                            borderBottomLeftRadius: data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.area == 2 &&
                                                data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.seatsInGroup[1].column == index_col ?
                                                '0' : '',
                                        }}
                                    >
                                        {data.rows.some(row => row.seats.some(item => item.row == index_row && item.column == index_col)) ?
                                            <span>
                                                {data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.name}.
                                                {data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.id}
                                            </span>
                                            :
                                            '...'}
                                    </p>
                                </td>
                            ))}
                            {/* /////////////////////////////////////////////////////////////////////////// */}
                            <td
                                className='name-row'
                                style={{
                                    visibility: data.rows.some(row => row.seats.some(item => item.row == index_row)) ?
                                        '' : 'hidden',
                                }}
                            >
                                {data.rows.some(row => row.seats.some(item => item.row == index_row)) ?
                                    data.rows.find(row => row.seats.some(item => item.row == index_row))?.name
                                    :
                                    '...'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className='screen'>SCREEN</p>
            <button className='btn' onClick={() => checkValidSeat()}>NEXT</button>
        </div>
    )
}
