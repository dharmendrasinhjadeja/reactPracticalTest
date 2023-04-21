import { useEffect, useState } from 'react'

import axios from 'axios'

const GetSinglePostApi = (id) => {
  const [data, setData] = useState(undefined)
  const fetchData = async () => {
    const response = await axios.get(`https://dummyjson.com/posts/${id}`)
    const data = await response.data
    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return { data, fetchData }
}

export default GetSinglePostApi
