export interface IPaginationOption {
  size?: number
  page?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface IOptionsResult{
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}

const paginationHelpers = (options: IPaginationOption): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.size || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};


export default paginationHelpers