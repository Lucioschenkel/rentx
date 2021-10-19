export interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  drivers_license: string;
  avatar?: string;
  id?: string;
}
