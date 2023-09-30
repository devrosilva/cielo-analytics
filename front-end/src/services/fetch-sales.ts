import { formatDate } from '@/utils/format-date'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL
const timeout = Number(import.meta.env.VITE_API_TIMEOUT)

export const fetchSalesByPageSizeAndNumber = async (
  pageSize: number,
  pageNumber: number,
) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/sales?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      { timeout },
    )
    return data
  } catch (err) {
    console.error(err)
  }
}

export const fetchSalesByDate = async (
  from: Date | undefined,
  to: Date | undefined,
) => {
  if (!(from && to)) return

  const fromParam = formatDate(from)
  const toParam = formatDate(to)
  try {
    const { data } = await axios.get(
      `${baseURL}/sales?from=${fromParam}&to=${toParam}`,
      { timeout },
    )
    return data
  } catch (err) {
    console.error(err)
  }
}
