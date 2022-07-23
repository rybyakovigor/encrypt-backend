// Core
import { Request } from 'express';

// Models
import { UserModel } from 'src/modules/user/user.model';

export interface RequestWithUser extends Request {
  user: UserModel;
}
