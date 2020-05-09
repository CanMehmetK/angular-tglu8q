export class TokenModel {
  success!: boolean;
  data!: ApplicationUserViewModel;
}
interface ApplicationUserViewModel {
  id: string;
  email: string;
  userName;
  token;
  isEnabled: boolean;
  adi: string;
  soyadi: string;
  name: string;

}
