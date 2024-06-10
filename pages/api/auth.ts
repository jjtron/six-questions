import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';
const jwt = require('jsonwebtoken');
const session = require('express-session');

//import pw from '../password';
type ResponseData = {
    message: string
}

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'jman0007',
    port: 5432,
});
client.connect();

let users: any[] = [{username: 'mike', password: '123456'}];

//Function to check if the user is authenticated
const authenticatedUser = (username: string | string[], password: string | string[])=>{
    let validusers = users.filter((user: any)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
}
//Function to check if the user exists
const doesExist = (username: string)=>{
    let userswithsamename = users.filter((user: any)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    try {

        const username = req.body.username;
        const password = req.body.password;
        
        if (!username || !password) {
            return res.status(404).json({message: "Error logging in"});
        }
        
        if (authenticatedUser(username, password)) {
          let accessToken = jwt.sign({
            data: password
          }, 'access', { expiresIn: 60 * 60 });
          console.log('HWY WYT?', accessToken);
          /*
          req.session.authorization = {
            accessToken,username
          }
          */
        
        
        return res.status(200).send({message: "User successfully logged in"});
        
        } else {
          return res.status(208).json({message: "Invalid Login. Check username and password"});
        }
        

    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'false' })
        throw new Error('Failed ....');
    }
}
