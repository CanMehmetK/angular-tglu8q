import { SignInModel } from '../signIn.model';
import { UserModel } from './user.model';

export class AddUserModel extends UserModel {
    signIn!: SignInModel;
}
