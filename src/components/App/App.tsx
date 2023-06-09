import { Routes, Route } from 'react-router-dom'
import MainPage from '../../pages/MainPage/MainPage'
import BookmarksPage from '../../pages/BookmarksPage/BookmarksPage'
import Layout from '../Layout/Layout'

const App = () => {

    return (
        <div>
            <Routes>
                <Route path='/*' element={<Layout />} >
                    <Route index element={<MainPage />} />
                    <Route path="bookmarks" element={<BookmarksPage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
