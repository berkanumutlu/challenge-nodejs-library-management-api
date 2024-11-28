export interface CreateUserDto {
    name: string;
}

export interface UserResponseDto {
    id: number;
    name: string;
}
export const UserResponseDtoKeys = ['id', 'name'] as const;

export interface UserBookDto {
    name: string;
    userScore?: number;
}
export const UserBookDtoKeys = ['name', 'userScore'] as const;

export interface UserBooksResponseDto {
    past: UserBookDto[];
    present: UserBookDto[];
}
export const UserBooksResponseDtoKeys = ['past', 'present'] as const;

export interface UserDetailedResponseDto extends UserResponseDto {
    books: UserBooksResponseDto;
}
export const UserDetailedResponseDtoKeys = ['id', 'name', 'books'] as const;