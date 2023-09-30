import { describe, expect, test, vi } from 'vitest'
import axios from 'axios'
import { fetchSalesByPageSizeAndNumber } from '@/services/fetch-sales'
import data from "../../../api/sales.json" assert { type: 'json' };

const baseURL = 'http://localhost:3000'
const pageSize = 25
const pageNumber = 60
const timeout = 3000
const salesMock = data

vi.mock('axios')

describe('Dashboard page', () => {
  describe('Sales Retrieve Service', () => {
    test('makes a GET request to fetch sales', async () => {
      vi.mocked(axios.get).mockResolvedValue({
        data: salesMock
      })

      const sales = await fetchSalesByPageSizeAndNumber(pageSize, pageNumber)
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(`${baseURL}/sales?pageSize=${pageSize}&pageNumber=${pageNumber}`, {timeout})
      expect(sales).toStrictEqual(salesMock)
    })

    test('if the number of returned items corresponds to the defined pageSize', async () => {
      vi.mocked(axios.get).mockResolvedValue({
        data: salesMock
      })

      const sales = await fetchSalesByPageSizeAndNumber(pageSize, pageNumber)
      const pagination = sales.pagination
      const items = sales.items
      expect(pagination.pageNumber).toBeLessThan(salesMock.pagination.numPages)
      expect(items.length).toBe(pageSize)
    })
  })
})
