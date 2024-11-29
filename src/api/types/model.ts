export type UserModelType = {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
};
export type BookModelType = {
    id?: number;
    name: string;
    score?: string | number;
    userScore?: number;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
};
export type BorrowedBookModelType = {
    id?: number;
    userId: number;
    bookId: number;
    borrowAt: Date;
    returnAt?: Date | null;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
};