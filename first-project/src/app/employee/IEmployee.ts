import { ISkill } from './ISkill';

export interface IEmployee {
  id: number;
  fullName: string;
  contact: string;
  email: string;
  phone?: string;
  skills: ISkill[];
}
