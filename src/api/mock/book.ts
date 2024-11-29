import { faker } from "@faker-js/faker";
import { db } from "@/config/database";
import { Book } from "@/models";

export const destroyBooks = async () => {
    try {
        console.log(`\n- ${new Date()} - Resetting Books table...`);
        await db.transaction(async (transaction) => {
            await Book.destroy({ where: {}, truncate: true, transaction });
            console.log(`\n ${new Date()} - Books table reset...`);
        });
    } catch (error) {
        console.error(`\n ${new Date()} - An error occurred while resetting the Books table:`, error);
    }
};

export const createBooks = async (count: number) => {
    try {
        if (count < 1) return null;

        let i = 1;
        const lastRecord = await Book.findOne({
            attributes: ['id'],
            order: [['id', 'DESC']],
            paranoid: false
        });
        if (lastRecord?.getDataValue('id')) {
            i = Number(lastRecord.getDataValue('id')) + 1;
        }

        console.log(`\n- ${new Date()} - Creating ${count} books...\n`);
        const bookList = [];
        const existingBookNames = new Set(
            (await Book.findAll({ attributes: ['name'], paranoid: false })).map((book) => book.getDataValue('name'))
        );
        for (i; i < count + 1; i++) {
            let bookName;
            do {
                bookName = faker.book.title();
            } while (existingBookNames.has(bookName));
            existingBookNames.add(bookName);

            bookList.push({
                id: i,
                name: bookName,
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: Math.random() < 0.2 ? null : new Date()
            });
        }

        const createdBooks = await Book.bulkCreate(bookList);
        console.log(`\n ${new Date()} - Created ${count} books successfully!\n`);

        return createdBooks;
    } catch (error) {
        console.error(`\n ${new Date()} - An error occurred while creating the books:`, error);
    }
};