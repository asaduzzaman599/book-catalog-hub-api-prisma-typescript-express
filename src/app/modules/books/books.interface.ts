export interface IPaginationOption {
  size?: number
  page?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface IFilterOption {
  search?: string
  minPrice?: number 
  maxPrice?:number
  category?: string
}