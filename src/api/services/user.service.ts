import { CreateUserDto, UserResponseDto, UserDetailedResponseDto, UserResponseDtoKeys, UserBookDtoKeys } from "@/types/dtos/user.dto";
import { mapDataToDto } from "@/utils/dto";
import { User, Book, BorrowedBook } from "@/models";

export class UserService {
    public getUsers = async (): Promise<UserResponseDto[]> => {
        const users = await User.findAll({
            attributes: ['id', 'name', 'createdAt'],
            order: [['name', 'ASC']]
        });

        return mapDataToDto<UserResponseDto>(UserResponseDtoKeys, users) as UserResponseDto[];
    };

    public getUserByIdWithBooks = async (userId: number): Promise<UserDetailedResponseDto | null> => {
        const user = await User.findByPk(userId, {
            include: [{
                model: BorrowedBook,
                as: 'borrowedBooks',
                include: [{
                    model: Book,
                    as: 'book',
                    attributes: ['id', 'name', 'createdAt']
                }]
            }]
        });

        if (!user) {
            return null;
        }

        const userResponseDto = mapDataToDto(UserResponseDtoKeys, user);

        const userBorrowedBooks = user.get('borrowedBooks') as any[];
        const userPastBorrowedBooks = userBorrowedBooks.filter(borrowedBookItem => borrowedBookItem.getDataValue('returnAt') !== null)
            .map(borrowedBookItem => {
                borrowedBookItem.book.userScore = borrowedBookItem.rating;
                return mapDataToDto(UserBookDtoKeys, borrowedBookItem.getDataValue('book'));
            });
        const userPresentBorrowedBooks = userBorrowedBooks.filter(borrowedBookItem => borrowedBookItem.getDataValue('returnAt') === null)
            .map(borrowedBookItem => mapDataToDto(UserBookDtoKeys, borrowedBookItem.getDataValue('book')));

        const userBooksResponseDto = {
            books: {
                past: userPastBorrowedBooks,
                present: userPresentBorrowedBooks
            }
        };

        return { ...userResponseDto, ...userBooksResponseDto } as UserDetailedResponseDto;
    };

    public createUser = async (userData: CreateUserDto): Promise<UserResponseDto> => {
        const user = await User.create(userData);

        return mapDataToDto<UserResponseDto>(UserResponseDtoKeys, user) as UserResponseDto;
    };
}
