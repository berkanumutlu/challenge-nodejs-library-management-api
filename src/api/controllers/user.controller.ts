import { CustomRequest, CustomResponse, CustomNext } from "@/types/route";
import { CreateUserDto, UserRequestParamsDto } from "@/types/dtos/user.dto";
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
            const { id } = req.params as unknown as UserRequestParamsDto;

            const record = await this.userService.getUserByIdWithBooks(id);

            // if (!record) return res.warning('User not found.');

            return res.success(record);
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            const requestData = req.body as CreateUserDto;

            const newRecord = await this.userService.createUser(requestData);

            // return res.success(newRecord, 'User created successfully', 201);
            return res.success(null, null, 201);
        } catch (error) {
            next(error);
        }
    };
}