export default interface IUser {
  id: string;
  name: string;
  email: string;
  likeQuestions: string[];
  notification: boolean;
  admin?: boolean;
}
