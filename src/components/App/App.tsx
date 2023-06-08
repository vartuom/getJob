import { useEffect, useState } from 'react'
import axios from 'axios'
import { Pagination, TextField } from '@mui/material'
import { type IJobResponseData, type VacancyElement } from '../../types/types'
import JobList from '../JobList/JobList'
import s from './App.module.scss'
import { debounce } from '../../utils/utils'
const BASE_URL = 'http://opendata.trudvsem.ru/api/v1/vacancies?'

const App = () => {
  const [jobs, setJobs] = useState<VacancyElement[]>([])
  const [query, setQuery] = useState('')
  const [totalJobsQty, setTotalJobsQty] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isFetching, setIsFetching] = useState(true)

  const pageSize = 3;

  const handleFilter = (value: string) => {
    setOffset(0)
    setQuery(value)
  }

  const debouncedSetQuery = debounce(handleFilter, 800)

  useEffect(() => {
    let activeFetch = true
    setIsFetching(true)
    async function getJobs(): Promise<void> {
      const res = await axios.get<IJobResponseData>(BASE_URL + `text=${query}&offset=${offset}&limit=${pageSize}`)
      if (activeFetch) {
        if (res.data.meta.total <= 999) {
          setTotalJobsQty(res.data.meta.total)
        } else {
          setTotalJobsQty(999)
        }        
        if (res.data.results.vacancies) {
          setJobs(res.data.results.vacancies)
        } else {
          setJobs([])
        }
        setIsFetching(false)
        console.log(res.data)
      }
    }
    void getJobs()
    return () => {
      activeFetch = false
    }
  }, [offset, query])

  useEffect(() => {
    console.log(jobs)
  }, [jobs])

  return (
    <>
      {<main className={s.wrapper}>
        <TextField
          id="queryFilter"
          label="Поиск..."
          variant="outlined"
          fullWidth
          onChange={evt => debouncedSetQuery(evt.target.value)}
        />
        {
          jobs.length !== 0
            ? <>
              <Pagination
                size='large'
                count={Math.ceil(totalJobsQty / pageSize)}
                page={Math.floor(offset / pageSize)}
                onChange={(_, page) => {
                  setOffset((page - 1) * pageSize)
                }}
              />
              <JobList jobs={jobs} />
              <Pagination
                size="large"
                count={Math.floor(totalJobsQty / pageSize) + 1}
                page={Math.floor(offset / pageSize) + 1}
                onChange={(_, page) => {
                  setOffset((page - 1) * pageSize)
                }}
              />
            </>
            : <p>По запросу ничего не найдено :(</p>
        }
      </main>}
    </>
  )
}

export default App
