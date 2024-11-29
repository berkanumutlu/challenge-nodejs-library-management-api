import { db } from "@/config/database";
import { createUsers, destroyUsers } from "./user";
import { createBooks, destroyBooks } from "./book";
import { createBorrowedBooks, destroyBorrowedBooks } from "./borrowedBook";

async function seedMockData() {
    try {
        console.log(`\n- ${new Date()} - Establishing database connection...\n`);
        await db.authenticate();

        await destroyUsers();
        const users = await createUsers(50);

        await destroyBooks();
        const books = await createBooks(150);

        if (users?.length && books?.length) {
            await destroyBorrowedBooks();
            await createBorrowedBooks(100, users, books);
        }

        console.log(`\n- ${new Date()} - Created mock data successfully!`);
    } catch (error) {
        console.error(`\n- ${new Date()} - An error occurred while creating mock data:`, error);
    } finally {
        await db.close();
    }
}

seedMockData();