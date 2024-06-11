'use server'

import type { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { clientConnection } from '@/app/lib/database';
import { SignJWT } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10 sec from now")
      .sign(key);
}

export default async function POST(request: NextApiRequest, response: NextApiResponse){
    try {
        // simulate slow response
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        const reqBody = await request.body;
        const {email, password} = reqBody;

        const existingUser: any = await clientConnection.query(`SELECT * from public.users WHERE email='${email}'`);
        if(existingUser.rowCount !== 1){
            return response.status(400).json({error: 'User does not exist'});
        }
        const user: {id: string; name: string; email: string; password: string } = existingUser.rows[0];
        
        // Create the session
        const expires = new Date(Date.now() + 10 * 1000);
        const session = await encrypt({ user, expires });

        // Save the session in a cookie
        var cookies = new Cookies(request, response);
        cookies.set("session", session, { expires, httpOnly: true });

        return response.status(200).json({success: true});

    } catch (e) {
        return response.status(500);
    }
}