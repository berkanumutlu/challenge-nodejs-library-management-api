export interface CreateBookDto {
    name: string;
}

export interface BooksResponseDto {
    id: number;
    name: string;
}
export const BooksResponseDtoKeys = ['id', 'name'] as const;

export interface BookResponseDto extends BooksResponseDto {
    score: string | number;
}
export const BookResponseDtoKeys = [...BooksResponseDtoKeys, 'score'] as const;