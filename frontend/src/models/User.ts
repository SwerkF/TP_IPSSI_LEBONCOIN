export interface User {
    _id?: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
  }