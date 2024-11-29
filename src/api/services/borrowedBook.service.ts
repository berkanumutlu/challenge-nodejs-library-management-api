import { BorrowedBook } from "@/models/borrowedBook.model";

export class BorrowedBookService {
    public borrowBook = async (userId: number, bookId: number) => {
        const existRecord = await BorrowedBook.findOne({ where: { userId, bookId }, attributes: ['id'] });
        if (existRecord) {
            throw new Error('This user has already borrowed this book.');
        }

        const newRecord = await BorrowedBook.create({
            userId,
            bookId,
            borrowAt: new Date()
        });

        return newRecord;
    };

    public returnBook = async (userId: number, bookId: number, score?: number) => {
        const borrowedBook = await BorrowedBook.findOne({ where: { userId, bookId }, attributes: ['id', 'returnAt', 'rating'] });
        if (!borrowedBook) {
            throw new Error('No borrow record found for this user and book.');
        }

        if (borrowedBook.getDataValue('returnAt') !== null) {
            throw new Error('This book has already been returned.');
        }

        borrowedBook.setDataValue('returnAt', new Date());
        if (score !== undefined) {
            borrowedBook.setDataValue('rating', score);
        }

        await borrowedBook.save();

        return borrowedBook;
    };
}
