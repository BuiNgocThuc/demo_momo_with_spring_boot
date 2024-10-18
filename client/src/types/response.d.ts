interface ResponseDataType<T> {
  contents: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}
