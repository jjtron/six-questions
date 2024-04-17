import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { Client } from 'pg';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

const client = new Client({
  user: 'jjtron',
  host: 'localhost',
  database: 'jjtron',
  password: '',
  port: 5432,
});
client.connect();

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await client.query(`SELECT * FROM users WHERE email='${email}'`);
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log('passwordsMatch', passwordsMatch);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});