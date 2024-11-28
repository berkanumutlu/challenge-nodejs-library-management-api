import { CustomRequest, CustomResponse, CustomNext } from "@/types/route";
import { CreateBookDto } from "@/types/dtos/book.dto";
import { BookService } from "@/services/book.service";

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public listBooks = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const records = await this.bookService.getBooks();
            // if (!records || !records.length) return res.warning('No books found.');
            return res.success(records);
        } catch (error) {
            next(error);
        }
    };

    public getBookById = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const bookId = parseInt(req.params.id);
            const record = await this.bookService.getBookById(bookId);
            // if (!record) return res.warning('Book not found.');
            return res.success(record);
        } catch (error) {
            next(error);
        }
    };

    public createBook = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const bookData: CreateBookDto = req.body;
            const newRecord = await this.bookService.createBook(bookData);
            // res.success(newRecord, 'Book created successfully', 201);
            return res.success(null, null, 201);
        } catch (error) {
            next(error);
        }
    };
}