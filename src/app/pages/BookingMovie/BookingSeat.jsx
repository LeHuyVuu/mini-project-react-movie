import React, { useEffect, useState } from 'react';
import './BookingSeat.css';

export default function BookingSeat(props) {
    const TotalTicket = props.total_ticket;

    const [SeatTable, setSeatTable] = useState(Array(13).fill(0).map(() =>
        Array(22).fill(0).map(() => (0))
    ));

    const [ChosenSeat, setChosenSeat] = useState([]);
    useEffect(() => {
        props.onSeatCountChange(ChosenSeat.length);
    }, [ChosenSeat]);

    const SeatTableExample = [
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2],
        [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 0]
    ]

    const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const chooseSeat = (row, col) => {
        if (SeatTableExample[row][col] === 1 || SeatTableExample[row][col] === 2) {
            if (ChosenSeat.some(seat => seat[0] === row && seat[1] === col)) {
                setChosenSeat(prev => prev.filter(seat => seat[0] !== row || seat[1] !== col))
            } else if (ChosenSeat.length < TotalTicket) {
                setChosenSeat(prev => [...prev, [row, col]]);
            }
        }
    }

    return (
        <div className='bookingseat-container'>
            {/* <p>{JSON.stringify(ChosenSeat)} - {ChosenSeat.length}</p>
            <p>{TotalTicket}</p> */}
            <p className='screen'>SCREEN</p>
            <table
                className='no-wrap align-middle'
                style={{
                    // '--table-width': 0,
                    // '--table-height': 0,
                }}
            >
                <tbody>
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
                </tbody>
            </table>
        </div>
    )
}
