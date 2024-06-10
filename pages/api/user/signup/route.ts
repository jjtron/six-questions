import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'jman0007',
    port: 5432,
});
client.connect();

export default async function POST(request: NextApiRequest, response: NextApiResponse) {
    try {

        const reqBody = await request.body;
        const { username, email, password } = reqBody;

        const existingUser = await client.query(`SELECT * from public.users WHERE name='${reqBody.username}'`);
        if (existingUser.rowCount !== 0) {
            return response.status(400).send({success: false});;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
;
        const newUser = {
            id: uuidv4(),
            username: reqBody.username,
            email: reqBody.email,
            password: hashedPassword
        };

        const statement = 'INSERT INTO public.users (id, name, email, password) VALUES(($1),($2),($3),($4));';
        const variables = [newUser.id, newUser.username, newUser.email, newUser.password];
        const savedUser = await client.query(statement, variables);

        return response.status(200).send({m: 'm'});

    } catch (error: any) {
        return { error: error.message };
    }
}