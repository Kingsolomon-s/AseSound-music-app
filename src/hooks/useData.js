const API_KEY = "26011ba2"

import axios from "axios";
import { useEffect, useState } from "react";

const useData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=${API_KEY}&format=jsonpretty&limit=15&fuzzytags=groove+rock&speed=high+veryhigh`, { signal: controller.signal })
      .then(response => {
        setData(response.data.results)
        console.log(response.data.results);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Request cancelled: ", error);
          return
        }
        setError(error)
        console.log("Error fetching data: ", error);
      })


    return () => {
      controller.abort()
    }
  }, [])

  return {
    data, error
  }
}

export default useData