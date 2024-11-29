export interface CreateUserDto {
    name: string;
}

export interface UserRequestParamsDto {
    id: number;
}

export interface UserResponseDto {
    id: number;
    name: string;
}
export const UserResponseDtoKeys = ['id', 'name'] as const;

export interface UserBookResponseDto {
    name: string;
    userScore?: number;
}
export const UserBookDtoKeys = ['name', 'userScore'] as const;

export interface UserBooksResponseDto {
    past: UserBookResponseDto[];
    present: UserBookResponseDto[];
}
export const UserBooksResponseDtoKeys = ['past', 'present'] as const;

export interface UserDetailedResponseDto extends UserResponseDto {
    books: UserBooksResponseDto;
}
export const UserDetailedResponseDtoKeys = [...UserResponseDtoKeys, 'books'] as const;