export interface ResultObject<T> {
    object: T,
    message: string,
    status: string,
    total: number
}