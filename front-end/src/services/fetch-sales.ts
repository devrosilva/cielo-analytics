import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL
const timeout = Number(import.meta.env.VITE_API_TIMEOUT)

export const fetchSales = async (pageSize: number, pageNumber: number) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/sales?pageSize=${pageSize}&pageNumber=${pageNumber}`, {timeout}
    )
    return data
  } catch (err) {
    console.error(err)
  }
}