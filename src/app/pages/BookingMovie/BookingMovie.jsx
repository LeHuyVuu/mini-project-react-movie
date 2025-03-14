import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookingMovie.css';

import BookingSeat from './BookingSeat/BookingSeat';
import FoodPNG from '../../assets/img/ComboFood.png';
import { AvailableTime, ComboFood, TypeOfTicket } from './data';

export default function BookingMovie() {

    const [ChosenDay, setChosenDay] = useState(new Date().toLocaleString('en-US', { weekday: 'short' }));
    const [ChosenDate, setChosenDate] = useState(new Date().toISOString().split('T')[0]);
    const [ChosenTime, setChosenTime] = useState({ Time: AvailableTime[0].Time, Category: '' });

    const [chosenSeatCount, setChosenSeatCount] = useState(0);
    const handleSeatCountChange = (count) => {
        setChosenSeatCount(count);
    };

    const [Ticket, setTicket] = useState({
        Child: 0,
        Adult: 0,
        AdultCouple: 0
    });

    const handleSetDayAndDate = (index) => {
        const today = new Date();
        const dayofweek = new Date(today);
        dayofweek.setDate(today.getDate() - today.getDay() + index + 1);
        setChosenDate(dayofweek.toISOString().split('T')[0]);
        setChosenDay(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayofweek.getDay()]);
    }

    const AddTicket = (Name) => {
        if (Name === 'Child') {
            setTicket(prev => ({ ...prev, Child: prev.Child + 1 }));
        } else if (Name === 'Adult') {
            setTicket(prev => ({ ...prev, Adult: prev.Adult + 1 }));
        } else if (Name === 'Adult Couple') {
            setTicket(prev => ({ ...prev, AdultCouple: prev.AdultCouple + 1 }));
        }
    }

    const SubtractTicket = (Name) => {
        if (chosenSeatCount < Ticket.Child + Ticket.Adult + Ticket.AdultCouple) {
            if (Name === 'Child' && Ticket.Child > 0) {
                setTicket(prev => ({ ...prev, Child: prev.Child - 1 }));
            } else if (Name === 'Adult' && Ticket.Adult > 0) {
                setTicket(prev => ({ ...prev, Adult: prev.Adult - 1 }));
            } else if (Name === 'Adult Couple' && Ticket.AdultCouple > 0) {
                setTicket(prev => ({ ...prev, AdultCouple: prev.AdultCouple - 1 }));
            }
        }
    }

    return (
        <div className='bookingmovie-container'>
            <h1>BOOKING MOVIE</h1>

            <Link to={'ticketinfor'}>TicketInfor</Link>
            <Link to={'bookingseat'}>BookingSeat</Link>
            <Link to={'offer'}>Offer</Link>
            <Link to={'payment'}>Payment</Link>
            <Link to={'exportticket'}>ExportTicket</Link>

            <form className='form-group'>
                <h2>Choose Theater</h2>
                <select>
                    <option value='' className='opt'>-- Choose Theater --</option>
                    <option value='cgv' className='opt'>CGV</option>
                    <option value='lotte' className='opt'>Lotte Cinema</option>
                    <option value='galaxy' className='opt'>Galaxy Cinema</option>
                    <option value='bhd' className='opt'>BHD Star Cineplex</option>
                </select>
            </form>

            <div className='table-container'>
                <div className='day-date-container'>
                    <h2>{ChosenDay}, {ChosenDate}</h2>
                    <table className='no-wrap align-middle table'>
                        <thead>
                            <tr>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                                <th>Sun</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {[...Array(7)].map((_, index) => (
                                    <td
                                        key={index}
                                        onClick={() => { handleSetDayAndDate(index) }}
                                    >
                                        <div
                                            className={(() => {
                                                const today = new Date();
                                                const dayofweek = new Date(today);
                                                dayofweek.setDate(today.getDate() - today.getDay() + index + 1);
                                                return dayofweek.toISOString().split('T')[0] === ChosenDate ? 'this-date' : '';
                                            })()}
                                        >
                                            {(() => {
                                                const today = new Date();
                                                const dayofweek = new Date(today);
                                                dayofweek.setDate(today.getDate() - today.getDay() + index + 1);
                                                return dayofweek.getDate();
                                            })()}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='time-container'>
                    <h2>{ChosenTime.Time}</h2>
                    <table className='no-wrap align-middle table'>
                        <thead>
                            <tr>
                                {AvailableTime.map((time, index) => (
                                    <th key={index}>{time.Category}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {AvailableTime.map((time, index) => (
                                    <td key={index} onClick={() => setChosenTime(time)}>
                                        <div
                                            className={time.Time === ChosenTime.Time ? 'this-time' : ''}
                                        >
                                            {time.Time}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h2>Choose Type Of Ticket</h2>
            <div className='type-of-ticket-container'>
                <table className='no-wrap align-middle table'>
                    <thead>
                        <tr>
                            {TypeOfTicket.map((ticket, index) => (
                                <th key={index}>{ticket.Name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {TypeOfTicket.map((ticket, index) => (
                                <td key={index}>
                                    <div className='detail-container'>
                                        <span>{ticket.Price} VND</span>
                                        <div className='button-container'>
                                            <button className='btn' onClick={() => SubtractTicket(ticket.Name)}>-</button>
                                            {ticket.Name === 'Child' ?
                                                <span style={{ backgroundColor: Ticket.Child !== 0 ? '#dc3545' : '' }}>{Ticket.Child}</span>
                                                :
                                                ticket.Name === 'Adult' ?
                                                    <span style={{ backgroundColor: Ticket.Adult !== 0 ? '#dc3545' : '' }}>{Ticket.Adult}</span>
                                                    :
                                                    ticket.Name === 'Adult Couple' ?
                                                        <span style={{ backgroundColor: Ticket.AdultCouple !== 0 ? '#dc3545' : '' }}>{Ticket.AdultCouple}</span>
                                                        :
                                                        <span>0</span>
                                            }
                                            <button className='btn' onClick={() => AddTicket(ticket.Name)}>+</button>
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='food-container'>
                <h2>Choose Combo</h2>
                {ComboFood.map((combo, index) => (
                    <div key={index} className='food-item'>
                        <div className='img-detail'>
                            <img src={FoodPNG} alt='ComboFood'></img>
                            <div className='detail'>
                                <h3>{combo.Name}</h3>
                                <p>{combo.Detail}</p>
                                <p>Price: {combo.Price} VND</p>
                            </div>
                        </div>
                        <div className='button'>
                            <button className='btn'>-</button>
                            <span>ABC</span>
                            <button className='btn'>+</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
