import { DataTypes, Model } from "sequelize";
import { BookModelType } from "@/types/model";
import { db } from "@/config/database";

export class Book extends Model<BookModelType> {
    static associate(models: any) {
        Book.hasMany(models.BorrowedBook, { foreignKey: 'bookId', as: 'borrows' });
    }
};

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize: db,
        tableName: 'Books',
        modelName: 'Book',
        timestamps: true,
        paranoid: true
    }
);