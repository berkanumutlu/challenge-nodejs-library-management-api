import { faker } from "@faker-js/faker";
import { db } from "@/config/database";
import { User } from "@/models";

export const destroyUsers = async () => {
    try {
        console.log(`\n- ${new Date()} - Resetting Users table...`);
        await db.transaction(async (transaction) => {
            await User.destroy({ where: {}, truncate: true, transaction });
            console.log(`\n ${new Date()} - Users table reset...`);
        });
    } catch (error) {
        console.error(`\n ${new Date()} - An error occurred while resetting the Users table:`, error);
    }
};

export const createUsers = async (count: number) => {
    try {
        if (count < 1) return null;

        let i = 1;
        const lastRecord = await User.findOne({
            attributes: ['id'],
            order: [['id', 'DESC']],
            paranoid: false
        });
        if (lastRecord?.getDataValue('id')) {
            i = Number(lastRecord.getDataValue('id')) + 1;
        }

        console.log(`\n- ${new Date()} - Creating ${count} users...\n`);
        const userList = [];
        for (i; i < count + 1; i++) {
            userList.push({
                id: i,
                name: faker.person.fullName(),
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: Math.random() < 0.2 ? null : new Date()
            });
        }

        const createdUsers = await User.bulkCreate(userList);
        console.log(`\n ${new Date()} - Created ${count} users successfully!\n`);

        return createdUsers;
    } catch (error) {
        console.error(`\n ${new Date()} - An error occurred while creating the users:`, error);
    }
};