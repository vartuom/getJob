import JobList from "../../components/JobList/JobList"
import { useAppSelector } from "../../store/store"

const BookmarksPage = () => {

    const bookmarks = useAppSelector(state => state.bookmarks.bookmarks).map(vacancy => {
        return { vacancy }
    })

    return (
        <>
        <JobList jobs={bookmarks} />
        </>
    )
}

export default BookmarksPage