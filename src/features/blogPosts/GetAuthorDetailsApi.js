import { useState } from 'react'
import axios from 'axios'

const GetAuthorDetailsApi = () => {
  const [data1, setData] = useState(undefined)

  const fetchData = async (id_user) => {
    const response = await axios.get(`https://dummyjson.com/users/${id_user}`)
    const data1 = await response.data
    setData(data1)
  }

  return { data1, fetchData }
}

export default GetAuthorDetailsApi
