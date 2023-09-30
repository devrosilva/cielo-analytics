import { Items } from './items'
import { Pagination } from './pagination'
import { SumaryData } from './sumary-data'

export type PayloadData = {
  summary: SumaryData
  pagination: Pagination
  items: Items
}
