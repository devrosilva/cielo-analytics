export const getPageCount = (numItems: number, pageSize: number) => {
    const whole = numItems / pageSize
    if(numItems % pageSize === 0) return whole
    return whole + (numItems % pageSize)
}