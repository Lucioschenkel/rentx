export interface ICreateUserTokenDTO {
  user_id: string;
  expiration_date: Date;
  refresh_token: string;
}
