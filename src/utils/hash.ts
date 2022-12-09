import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import { randomBytes } from 'crypto';
export const generatePasswordHash = (password: string) => hashSync(password, genSaltSync(10));
export const comparePasswordHash = (password: string, hash: string) => compareSync(password, hash);
export const generateSecret = (length: number) => randomBytes(length).toString('hex');
