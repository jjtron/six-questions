import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { clientConnection } from '@/app/lib/database';


export default async function POST(request: NextApiRequest, response: NextApiResponse) {
    try {
        const reqBody = await request.body;
        const { username, email, password } = reqBody;
        const existingUser = await clientConnection.query(`SELECT * from public.users WHERE name='${username}'`);
        if (existingUser.rowCount !== 0) {
            return response.status(400).send({success: false});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const statement = 'INSERT INTO public.users (id, name, email, password) VALUES(($1),($2),($3),($4));';
        const variables = [uuidv4(), username, email, hashedPassword];
        await clientConnection.query(statement, variables);
        return response.status(200).send({success: true});
    } catch (error: any) {
        return response.status(500).send({error: error, success: false});
    }
}