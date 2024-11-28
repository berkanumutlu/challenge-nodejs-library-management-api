import { DataTypes, Model } from "sequelize";
import { BorrowedBookModelType } from "@/types/models";
import { db } from "@/config/database";

export class BorrowedBook extends Model<BorrowedBookModelType> {
    static associate(models: any) {
        BorrowedBook.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        BorrowedBook.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
    }
};

BorrowedBook.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Books',
                key: 'id'
            }
        },
        borrowAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        returnAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { min: 1, max: 10 }
        }
    },
    {
        sequelize: db,
        tableName: 'BorrowedBooks',
        modelName: 'BorrowedBook',
        timestamps: true,
        paranoid: true
    }
);
