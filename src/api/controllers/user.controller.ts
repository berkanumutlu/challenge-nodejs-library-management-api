import { CustomRequest, CustomResponse, CustomNext } from "@/types/route";
import { CreateUserDto } from "@/types/dtos/user.dto";
import { UserService } from "@/services/user.service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public listUsers = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const records = await this.userService.getUsers();
            // if (!records || !records.length) return res.warning('No users found.');
            return res.success(records);
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const userId = parseInt(req.params.id);
            const record = await this.userService.getUserById(userId);
            // if (!record) return res.warning('User not found.');
            return res.success(record);
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const userData: CreateUserDto = req.body;
            const newRecord = await this.userService.createUser(userData);
            // res.success(newRecord, 'User created successfully', 201);
            return res.success(null, null, 201);
        } catch (error) {
            next(error);
        }
    };
}