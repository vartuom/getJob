import { useEffect, useState } from 'react'
import axios from 'axios'
import { Pagination, TextField } from '@mui/material'
import { MagnifyingGlass } from "react-loader-spinner";
import { type IJobResponseData, type VacancyElement } from '../../types/types'
import JobList from '../../components/JobList/JobList'
import s from './MainPage.module.scss'
import { debounce } from '../../utils/utils'
const BASE_URL = 'http://opendata.trudvsem.ru/api/v1/vacancies?'

const MainPage = () => {
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

  const getPage = () => {
    const page = offset % pageSize === 0 ? offset / pageSize + 1 : Math.ceil(offset / pageSize);
    return page
  }

  const debouncedSetQuery = debounce(handleFilter, 800)

  useEffect(() => {
    let activeFetch = true
    setIsFetching(true)
    async function getJobs(): Promise<void> {
      const res = await axios.get<IJobResponseData>(
        BASE_URL + `text=${query}&offset=${Math.ceil(offset / pageSize)}&limit=${pageSize}`
      )
      if (activeFetch) {
        if (res.data.meta.total <= 500) {
          setTotalJobsQty(res.data.meta.total)
        } else {
          setTotalJobsQty(500)
        }
        if (res.data.results.vacancies) {
          setJobs(res.data.results.vacancies)
        } else {
          setJobs([])
        }
        setIsFetching(false)
      }
    }
    void getJobs()
    return () => {
      activeFetch = false
    }
  }, [offset, query])

  return (
    <>
      <main className={s.wrapper}>
        <TextField
          id="queryFilter"
          label="Поиск..."
          variant="outlined"
          fullWidth
          onChange={evt => debouncedSetQuery(evt.target.value)}
        />
        {isFetching ? <MagnifyingGlass
          visible={true}
          height="256"
          width="256"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor='#c0efff'
          color='#e15b64'
        />
          : jobs.length !== 0
            ? <>
              <Pagination
                size="large"
                count={Math.ceil(totalJobsQty / pageSize)}
                page={getPage()}
                onChange={(_, page) => {
                  setOffset((page - 1) * pageSize)
                }}
              />
              <JobList jobs={jobs} />
              <Pagination
                size="large"
                count={Math.ceil(totalJobsQty / pageSize)}
                page={getPage()}
                onChange={(_, page) => {
                  window.scrollTo(0, 0)
                  setOffset((page - 1) * pageSize)
                }}
              />
            </>
            : <p>По запросу ничего не найдено :(</p>
        }
      </main>
    </>
  )
}

export default MainPage
