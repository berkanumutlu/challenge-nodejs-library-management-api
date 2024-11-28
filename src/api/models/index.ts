import { User } from './user';
import { Book } from './book';
import { BorrowedBook } from './borrowedBook';

const models = { User, Book, BorrowedBook };

// Initialize associations
export const initializeAssociations = () => {
    Object.values(models).forEach((model: any) => {
        if (model.associate) {
            model.associate(models);
        }
    });
};

export default models;