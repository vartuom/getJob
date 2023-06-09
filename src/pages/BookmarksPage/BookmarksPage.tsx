import Empty from "../../components/Empty/Empty"
import JobList from "../../components/JobList/JobList"
import { useAppSelector } from "../../store/store"
import s from './BookmarksPage.module.scss'

const BookmarksPage = () => {

    const bookmarks = useAppSelector(state => state.bookmarks.bookmarks)

    return (
        <section className={s.wrapper}>
            {bookmarks.length
                ? <JobList jobs={bookmarks} />
                : <Empty>Вы еще не добавили закладки</Empty>
            }

        </section>
    )
}

export default BookmarksPage