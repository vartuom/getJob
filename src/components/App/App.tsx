import {useEffect, useState} from 'react'
import axios from "axios";
import {Pagination} from "@mui/material";
import parse from 'html-react-parser';
const BASE_URL = "http://opendata.trudvsem.ru/api/v1/vacancies?"

function App() {
  const [count, setCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [jobsQty, setJobsQty] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
      let activeFetch = true;
      setIsFetching(true);
      async function getJobs() {
          const res = await axios.get(BASE_URL + `text=${query}&offset=${offset}&limit=5`);
          if (activeFetch) {
              setJobs(res.data.results.vacancies);
              setOffset(offset => offset + 5)
              setIsFetching(false);
          }
          return res
      }
      getJobs().then(() => console.log(jobs))
      return () => {
          activeFetch= false;
      }
  }, [])


  return (
    <>
      <div>
          <ul>
              {
                  jobs.map(job => (
                    <li key={job.vacancy.id}>
                        <p>
                            {job.vacancy["job-name"]}
                        </p>
                        <div>
                            {parse(job.vacancy.duty)}
                        </div>
                    </li>
                  ))
              }
          </ul>
        <Pagination
            count={25689}
            page={Math.ceil(offset/25)}
            onChange={(_, page) => setOffset(page * 25)}
        />
      </div>
    </>
  )
}

export default App
