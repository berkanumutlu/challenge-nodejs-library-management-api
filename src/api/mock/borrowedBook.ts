import { faker } from "@faker-js/faker";
import { db } from "@/config/database";
import { Book, BorrowedBook, User } from "@/models";

export const destroyBorrowedBooks = async () => {
    try {
        console.log(`\n- ${new Date()} - Resetting Borrowed Books table...`);
        await db.transaction(async (transaction) => {
            await BorrowedBook.destroy({ where: {}, truncate: true, transaction });
            console.log(`\n ${new Date()} - BorrowedBooks table reset...`);
        });
    } catch (error) {
        console.error(`\n ${new Date()} - An error occurred while resetting Borrowed Books table:`, error);
    }
};

export const createBorrowedBooks = async (count: number, users: User[], books: Book[]) => {
    try {
        if (count < 1 || !users.length || !books.length) return null;

        let i = 1;
        const lastRecord = await BorrowedBook.findOne({
            attributes: ['id'],
            order: [['id', 'DESC']],
            paranoid: false
        });
        if (lastRecord?.getDataValue('id')) {
            i = Number(lastRecord.getDataValue('id')) + 1;
        }

        console.log(`\n- ${new Date()} - Creating ${count} borrowed books...\n`);
        const borrowedBookList = [];
        for (i; i < count + 1; i++) {
            const createdAt = new Date();
            borrowedBookList.push({
                id: i,
                userId: faker.helpers.arrayElement(users).getDataValue('id') as number,
                bookId: faker.helpers.arrayElement(books).getDataValue('id') as number,
                borrowAt: createdAt,
                returnAt: Math.random() < 0.2 ? null : new Date(),
                rating: Math.floor(Math.random() * 10) + 1,
                createdAt: createdAt,
                updatedAt: null,
                deletedAt: Math.random() < 0.2 ? null : new Date()
            });
        }

        const createdBorrowedBooks = await BorrowedBook.bulkCreate(borrowedBookList);
        console.log(`\n ${new Date()} - Created ${count} borrowed books successfully!\n`);

        return createdBorrowedBooks;
    } catch (error) {
        console.error(`\n ${new Date()} - An error occurred while creating the borrowed books:`, error);
    }
};