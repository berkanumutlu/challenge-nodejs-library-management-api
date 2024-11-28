import { DataTypes, Model } from "sequelize";
import { UserModelType } from "@/types/model";
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