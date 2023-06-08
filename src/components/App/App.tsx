import {useEffect, useState} from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {Pagination} from "@mui/material";
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
      getJobs().then((res => console.log(res.data)));
      return () => {
          activeFetch= false;
      }
  }, [])


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <Pagination
            count={25689}
            page={Math.ceil(offset/25)}
            onChange={(_, page) => setOffset(page * 25)}
        />
    </>
  )
}

export default App
