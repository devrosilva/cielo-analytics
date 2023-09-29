export const fetchData = (options: { pageIndex: number, pageSize: number}, data) => {
    return {
        rows: data.slice(
        options.pageIndex * options.pageSize,
        (options.pageIndex + 1) * options.pageSize
        ),
        pageCount: Math.ceil(data.length / options.pageSize),
    }
}