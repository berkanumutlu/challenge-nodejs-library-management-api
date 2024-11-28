import { DataTypes, Model } from "sequelize";
import { UserModelType } from "@/types/models";
import { db } from "@/config/database";

export class User extends Model<UserModelType> {
    static associate(models: any) {
        User.hasMany(models.BorrowedBook, { foreignKey: 'userId', as: 'borrowedBooks' });
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    },
    {
        sequelize: db,
        tableName: 'Users',
        modelName: 'User',
        timestamps: true,
        paranoid: true
    }
);