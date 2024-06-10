import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connect } from '@/app/dbconfig/dbconfige';

const connection: any = connect();

export async function POST(request: NextRequest){
try {

    const reqBody = await request.json()
    const {email, password} = reqBody;

    const existingUser = await connection.query('SELECT * from public.users');
    if(!existingUser){
        return NextResponse.json({error: 'User does not exist'}, {status: 400})
    }

    const validPassword = await bcryptjs.compare(password, reqBody.password)
    if(!validPassword){
        return NextResponse.json({error: 'Invalid password'}, {status: 400})
    }

    const tokenData = {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

    const response = NextResponse.json({
        message: 'Login successful',
        success: true,
    })
    response.cookies.set('token', token, {
    httpOnly: true,

    })
    return response;

} catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
}
}