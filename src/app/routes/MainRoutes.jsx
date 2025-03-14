import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import { MovieDetail } from '../pages/MovieDetail/MovieDetail'
import { TVShowDetail } from '../pages/TVShowDetail/TVShowDetail'
import RootLayout from '../layouts/RootLayout'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import ScrollToTop from '../hooks/ScrollToTop'
import Contact from '../pages/Contact/Contact'
import Discount from '../pages/Discount/Discount'

import BookingMovie from '../pages/BookingMovie/BookingMovie'
import TicketInfo from '../pages/BookingMovie/TicketInfo/TicketInfo'
import BookingSeat from '../pages/BookingMovie/BookingSeat/BookingSeat'
import Offer from '../pages/BookingMovie/Offer/Offer'
import Payment from '../pages/BookingMovie/Payment/Payment'
import ExportTicket from '../pages/BookingMovie/ExportTicket/ExportTicket'


const MainRoutes = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/movie/:id' element={<MovieDetail />} />
                    <Route path='/tv/:id' element={<TVShowDetail />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/discount' element={<Discount />} />
                    <Route path='*' element={<PageNotFound />} />

                    <Route path='/booking' element={<BookingMovie />} />
                    <Route path='/booking/ticketinfor' element={<TicketInfo />} />
                        <Route path='/booking/bookingseat' element={<BookingSeat />} />
                    <Route path='/booking/offer' element={<Offer />} />
                    <Route path='/booking/payment' element={<Payment />} />
                    <Route path='/booking/exportticket' element={<ExportTicket />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes
