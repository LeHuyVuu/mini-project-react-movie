import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BookingSeat.css';

import { sTicketInfo } from '../../../context/Store';
import SEATSJSON from './seats.json';
import { Descriptions } from 'antd';

export default function BookingSeat() {
    const navigate = useNavigate();

    const data = SEATSJSON.data;
    const [ChosenSeat, setChosenSeat] = useState([]);

    useEffect(() => {
        let tickets = [];
        for (let seat of ChosenSeat) {
            tickets = [...tickets, {
                description: 'Mua ve truc tuyen qua trang web',
                price: data.rows.find(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3]))?.seats.find(item => item.row == seat[2] && item.column == seat[3])?.ticketPrice,
                ticketTypeCode: '',
                // ticketTypeCode: '0347',
                seats: [...[], seat[0] + seat[1]],
            }]
        }
        sTicketInfo.set((prev) => {
            prev.value.tickets = tickets;
        })
    }, [ChosenSeat])

    const chooseSeat = (name, id, index_row, index_col) => {
        if (ChosenSeat.some(seat => seat[0] == name && seat[1] == id)) {
            setChosenSeat(prev => prev.filter(seat => seat[0] !== name || seat[1] !== id))
        } else if (
            ChosenSeat.length < 8
            &&
            data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.status == 0
        ) {
            setChosenSeat(prev => [...prev, [name, id, index_row, index_col]]);
        }
    }

    const checkValidSeat = () => {
        console.log(ChosenSeat);

        console.log('Kiểm tra ô cách +-2 so với');
        for (let seat of ChosenSeat) {
            console.log(seat[0] + seat[1] + '~~~~~~~~~~~~~~~~~~~~~~~~~~');

            //Kiểm tra ô cách +2 so với tọa độ seat[0], seat[1]
            console.log('Nếu ô +2 đó có thể đặt chỗ, có tồn tại');
            if (data.rows.some(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] + 2))) {//Nếu ô +2 đó có thể đặt chỗ, có tồn tại
                console.log('OK');
                console.log('Nếu ô +2 đó đã có người khác đặt Hoặc mình đặt');
                if (
                    data.rows.find(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] + 2))?.seats.find(item => item.row == seat[2] && item.column == seat[3] + 2)?.status == 1 ||//Nếu ô +2 đó đã có người khác đặt
                    ChosenSeat.some(item => item[2] == seat[2] && item[3] == seat[3] + 2)//Hoặc mình đặt
                ) {
                    console.log('OK');
                    console.log('Nếu ô ở giữa chưa có ai khác đặt Và mình cũng không đặt Và có tồn tại');
                    if (
                        data.rows.find(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] + 1))?.seats.find(item => item.row == seat[2] && item.column == seat[3] + 1)?.status == 0 &&//Nếu ô ở giữa chưa có ai khác đặt
                        !ChosenSeat.some(item => item[2] == seat[2] && item[3] == seat[3] + 1) &&//Và mình cũng không đặt
                        data.rows.some(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] + 1))//Và có tồn tại
                    ) {
                        console.log('OK');
                        console.log('false');
                        return false;
                    }
                }
            } else if (//Nếu ô +2 đó không thể đặt chỗ, không tồn tại
                data.rows.find(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] + 1))?.seats.find(item => item.row == seat[2] && item.column == seat[3] + 1)?.status == 0 &&//Nếu ô ở giữa chưa có ai khác đặt
                !ChosenSeat.some(item => item[2] == seat[2] && item[3] == seat[3] + 1) &&//Và mình cũng không đặt
                data.rows.some(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] + 1))//Và có tồn tại
            ) {
                console.log('Nếu ô +2 đó không thể đặt chỗ, không tồn tại');
                console.log('OK');
                console.log('Nếu ô ở giữa chưa có ai khác đặt Và mình cũng không đặt Và có tồn tại');
                console.log('OK');
                console.log('false');
                return false;
            }

            //Kiểm tra ô cách -2 so với tọa độ seat[0], seat[1]
            console.log('Nếu ô -2 đó có thể đặt chỗ, có tồn tại');
            if (data.rows.some(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] - 2))) {//Nếu ô -2 đó có thể đặt chỗ, có tồn tại
                console.log('OK');
                console.log('Nếu ô -2 đó đã có người khác đặt Hoặc mình đặt');
                if (
                    data.rows.find(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] - 2))?.seats.find(item => item.row == seat[2] && item.column == seat[3] - 2)?.status == 1 ||//Nếu ô -2 đó đã có người khác đặt
                    ChosenSeat.some(item => item[2] == seat[2] && item[3] == seat[3] - 2)//Hoặc mình đặt
                ) {
                    console.log('OK');
                    console.log('Nếu ô ở giữa chưa có ai khác đặt Và mình cũng không đặt Và có tồn tại');
                    if (
                        data.rows.find(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] - 1))?.seats.find(item => item.row == seat[2] && item.column == seat[3] - 1)?.status == 0 &&//Nếu ô ở giữa chưa có ai khác đặt
                        !ChosenSeat.some(item => item[2] == seat[2] && item[3] == seat[3] - 1) &&//Và mình cũng không đặt
                        data.rows.some(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] - 1))//Và có tồn tại
                    ) {
                        console.log('OK');
                        console.log('false');
                        return false;
                    }
                }
            } else if (//Nếu ô -2 đó không thể đặt chỗ, không tồn tại
                data.rows.find(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] - 1))?.seats.find(item => item.row == seat[2] && item.column == seat[3] - 1)?.status == 0 &&//Nếu ô ở giữa chưa có ai khác đặt
                !ChosenSeat.some(item => item[2] == seat[2] && item[3] == seat[3] - 1) &&//Và mình cũng không đặt
                data.rows.some(row => row.seats.some(item => item.row == seat[2] && item.column == seat[3] - 1))//Và có tồn tại
            ) {
                console.log('Nếu ô -2 đó không thể đặt chỗ, không tồn tại');
                console.log('OK');
                console.log('Nếu ô ở giữa chưa có ai khác đặt Và mình cũng không đặt Và có tồn tại');
                console.log('OK');
                console.log('false');
                return false;
            }
        }

        if (ChosenSeat.length <= 0) return false;

        console.log('true');
        return true;
    }

    return (
        <>
            <sTicketInfo.DevTool name='dev-tool' />

            <div className='bookingseat-container'>

                {/* <p>{JSON.stringify(ChosenSeat)} - {ChosenSeat.length}</p> */}
                {/* <p>{JSON.stringify(data.rows.find(row => row.seats.some(item => item.row == 4 && item.column == 13))?.seats.find(item => item.row == 4 && item.column == 13)?.status)}</p> */}
                {/* <p>ID: {data.rows.some(row => row.seats.some(item => item.row == '12' && item.column == '2')) ? data.rows.find(row => row.seats.some(item => item.row == '12' && item.column == '2'))?.seats.find(item => item.row == '12' && item.column == '2')?.id : 'Not found'}</p> */}


                <table
                    className='no-wrap align-middle'
                    style={{
                        // '--table-width': 0,
                        // '--table-height': 0,
                    }}
                >
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
                                        onClick={() => chooseSeat(
                                            data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.name,
                                            data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.seats.find(item => item.row == index_row && item.column == index_col)?.id,
                                            index_row,
                                            index_col
                                        )}
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
                                                    '#dc3545' : 'transparent',
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
                                                    {data.rows.find(row => row.seats.some(item => item.row == index_row && item.column == index_col))?.name}
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

                <div className='screen'>MÀN HÌNH</div>

                <div className='button-container'>
                    <button className='btn btn-back' onClick={() => navigate(-1)}>BACK</button>

                    {checkValidSeat() === true ?
                        <Link to={'/booking/offer'}>
                            <button className='btn'>NEXT</button>
                        </Link>
                        :
                        <button className='btn btn-none'>NEXT</button>
                    }
                </div>
            </div>
        </>
    )
}
