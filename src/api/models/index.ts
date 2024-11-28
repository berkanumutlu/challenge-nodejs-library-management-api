import { User } from './user.model';
import { Book } from './book.model';
import { BorrowedBook } from './borrowedBook.model';

const models = { User, Book, BorrowedBook };

// Initialize associations
export const initializeAssociations = () => {
    Object.values(models).forEach((model: any) => {
        if (model.associate) {
            model.associate(models);
        }
    });
};

export { User, Book, BorrowedBook };
export default models;