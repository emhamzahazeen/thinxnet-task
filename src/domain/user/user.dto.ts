import { IUser } from '../../interfaces';

class UserDto implements IUser {
  isActive: boolean;
}

export class CreateUserDto extends UserDto {}
