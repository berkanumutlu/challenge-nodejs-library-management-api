export interface BorrowBookRequestParamsDto {
    userId: number;
    bookId: number;
}

export interface ReturnBookRequestParamsDto {
    userId: number;
    bookId: number;
}

export interface ReturnBookRequestBodyDto {
    score?: number;
}