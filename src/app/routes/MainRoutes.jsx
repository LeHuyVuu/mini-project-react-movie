import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import { MovieDetail } from '../pages/MovieDetail/MovieDetail'
import { TVShowDetail } from '../pages/TVShowDetail/TVShowDetail'
import RootLayout from '../layouts/RootLayout'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import BookingMovie from '../pages/BookingMovie/BookingMovie'
import ScrollToTop from '../hooks/ScrollToTop'
import Contact from '../pages/Contact/Contact'
import Discount from '../pages/Discount/Discount'

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/movie/:id' element={<MovieDetail />} />
                    <Route path='/tv/:id' element={<TVShowDetail />} />
                    <Route path='/booking' element={<BookingMovie />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/discount' element={<Discount />} />
                    <Route path='*' element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes
