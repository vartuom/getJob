import { type VacancyElement } from '../../types/types'
import parse from "html-react-parser"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import s from './JobItem.module.scss'
import AccordionRow from '../AccordionRow/AccordionRow'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addBookmark, removeBookmark } from '../../store/bookmarks.slice';

interface IJobListItemProps {
    job: VacancyElement
}
const JobListItem = ({ job }: IJobListItemProps) => {

    const bookmarks = useAppSelector(state => state.bookmarks.bookmarks)
    const isBookmarked = bookmarks.some((vacancy) => vacancy.id === job.vacancy.id)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        if (isBookmarked) {
            dispatch(removeBookmark(job.vacancy))
        } else {
            dispatch(addBookmark(job.vacancy))
        }
    }

    return (
        <div className={`${s.jobListItem} ${isBookmarked && s.jobListItem_active}`}>
            <div className={s.jobRegion}>
                <p>{job.vacancy.region.name} </p>
                <p>{job.vacancy.company.name}</p>
            </div>
            <h2 className={s.jobTitle}>
                {job.vacancy['job-name']}
            </h2>
            <p className={s.jobSalary}>
                {
                    !!job.vacancy.salary_min
                        ? `от ${job.vacancy.salary_min} \u20BD `
                        : ''
                }
                {
                    !!job.vacancy.salary_max
                        ? `до ${job.vacancy.salary_max} \u20BD`
                        : ''
                }
            </p>
            <p className={s.jobSalary}>
                {
                    job.vacancy.requirement.experience === 0
                        ? `Без опыта`
                        : ''
                }
                {
                    job.vacancy.requirement.experience === 1
                        ? `Опыт от 1 года`
                        : ''
                }
                {
                    job.vacancy.requirement.experience > 1
                        ? `Опыт от ${job.vacancy.requirement.experience} лет`
                        : ''
                }
                {
                    job.vacancy.requirement.education === 'Не указано'
                        ? ""
                        : `, ${job.vacancy.requirement.education} образование`
                }
            </p>
            <AccordionRow title='Обязанности'>
                <div className={s.jobDuty}>
                    {parse(job.vacancy.duty
                        ? job.vacancy.duty.replaceAll('<li>', '<p>').replaceAll('</li>', '</p>')
                        : '')}
                </div>
            </AccordionRow>
            <AccordionRow title='Контакты'>
                <div className={s.jobDuty}>
                    <p>
                        {job.vacancy.contact_person}
                    </p>
                    <ul className={s.jobContacts}>
                        {
                            job.vacancy.contact_list.map((contact, index) => (
                                <li key={index}>{`${contact.contact_type}: ${contact.contact_value}`}</li>
                            ))
                        }
                    </ul>
                </div>
            </AccordionRow>
            <button className={s.jobBookmark} onClick={handleClick}>
                {isBookmarked
                    ? <><BookmarkIcon sx={{ fontSize: "32px" }} /> Убрать </>
                    : <><BookmarkBorderIcon sx={{ fontSize: "32px" }} /> В закладки</>
                }
            </button>
        </div>
    )
}

export default JobListItem
