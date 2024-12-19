import { User } from './User';

export interface Annonce {
  _id?: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  category: string;
  user: User;
}