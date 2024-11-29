import { CustomRequest, CustomResponse, CustomNext } from "@/types/route";
import { BookRequestParamsDto, CreateBookDto } from "@/types/dtos/book.dto";
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
            if (!records || !records.length) return res.success(null, null, 204);

            return res.success(records);
        } catch (error) {
            next(error);
        }
    };

    public getBookById = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const { id } = req.params as unknown as BookRequestParamsDto;

            const record = await this.bookService.getBookByIdWithBorrows(id);

            // if (!record) return res.warning('Book not found.');
            if (!record) return res.success(null, null, 204);

            return res.success(record);
        } catch (error) {
            next(error);
        }
    };

    public createBook = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const requestData = req.body as CreateBookDto;

            const newRecord = await this.bookService.createBook(requestData);

            // return res.success(newRecord, 'Book created successfully', 201);
            return res.success(null, null, 201);
        } catch (error) {
            next(error);
        }
    };
}