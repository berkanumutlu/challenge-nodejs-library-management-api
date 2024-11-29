import { Op } from "sequelize";
import { BookResponseDto, BookResponseDtoKeys, BooksResponseDto, BooksResponseDtoKeys, CreateBookDto } from "@/types/dtos/book.dto";
import { mapDataToDto } from "@/utils/dto";
import { Book, BorrowedBook } from "@/models";

export class BookService {
    public getBooks = async (): Promise<BooksResponseDto[]> => {
        const books = await Book.findAll({
            attributes: ['id', 'name', 'createdAt'],
            order: [['name', 'ASC']]
        });

        return mapDataToDto<BooksResponseDto>(BooksResponseDtoKeys, books) as BooksResponseDto[];
    };

    public getBookByIdWithBorrows = async (bookId: number): Promise<BookResponseDto | null> => {
        const book = await Book.findByPk(bookId, {
            include: [{
                model: BorrowedBook,
                as: 'borrows',
                required: false,
                attributes: ['borrowAt', 'returnAt', 'rating', 'createdAt'],
                where: {
                    returnAt: { [Op.not]: null }
                }
            }]
        });

        if (!book) {
            return null;
        }

        let score: string | number = -1;
        const borrows = book.get('borrows') as any[];
        if (borrows.length > 0) {
            score = (borrows.reduce((sum, book) => sum + book.rating, 0) / borrows.length).toFixed(2);
        }
        book.setDataValue('score', score);

        return mapDataToDto<BookResponseDto>(BookResponseDtoKeys, book) as BookResponseDto;
    };

    public createBook = async (bookData: CreateBookDto): Promise<BookResponseDto> => {
        const existingBook = await Book.findOne({
            where: { name: bookData.name },
            paranoid: false
        });

        if (existingBook) {
            throw new Error(`A book with the name "${bookData.name}" already exists.`);
        }

        const book = await Book.create(bookData);

        return mapDataToDto<BookResponseDto>(BookResponseDtoKeys, book) as BookResponseDto;
    };
}