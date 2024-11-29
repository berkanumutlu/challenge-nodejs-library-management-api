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
        },
        score: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.getDataValue('score');
            },
            set(value: string) {
                this.setDataValue('score', value);
            }
        },
        userScore: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.getDataValue('userScore');
            },
            set(value: number) {
                this.setDataValue('userScore', value);
            }
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