import { type VacancyElement } from '../../types/types'
import JobItem from '../JobItem/JobItem'
import s from './JobList.module.scss'

interface IJobListProps {
    jobs: VacancyElement[]
}
const JobList = ({ jobs }: IJobListProps) => {
    return (
        <ul className={s.jobList}>
            {
                jobs.map(job => (
                    <li key={job.vacancy.id}>
                        <JobItem job={job} />
                    </li>
                ))
            }
        </ul>
    )
}

export default JobList
