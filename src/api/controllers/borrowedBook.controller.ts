import { CustomRequest, CustomResponse, CustomNext } from "@/types/route";
import { BorrowBookRequestParamsDto, ReturnBookRequestBodyDto, ReturnBookRequestParamsDto } from "@/types/dtos/borrowedBook.dto";
import { BorrowedBookService } from "@/services/borrowedBook.service";

export class BorrowedBookController {
    private borrowedBookService: BorrowedBookService;

    constructor() {
        this.borrowedBookService = new BorrowedBookService();
    }

    public borrowBook = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const { userId, bookId } = req.params as unknown as BorrowBookRequestParamsDto;

            const borrowBook = await this.borrowedBookService.borrowBook(userId, bookId);

            // return res.success(borrowBook, 'Book successfully borrowed.', 201);
            return res.success(null, null, 204);
        } catch (error) {
            next(error);
        }
    };

    public returnBook = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const { userId, bookId } = req.params as unknown as ReturnBookRequestParamsDto;
            const { score } = req.body as ReturnBookRequestBodyDto;

            const returnBook = await this.borrowedBookService.returnBook(userId, bookId, score);

            // return res.success(returnBook, 'Book successfully returned.', 201);
            return res.success(null, null, 204);
        } catch (error) {
            next(error);
        }
    };

}