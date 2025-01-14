import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({where: {email}});

    if(user) {
        throw Error('User already exists');
    }

    user = await prismaClient.user.create({
        data: {
            email,
            password: hashSync(password, 10),
            name
        }
    })

    res.json(user);
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({where: {email}});

    if(!user) {
        throw Error('User does not exist');
    }

    if(!compareSync(password, user.password)) {
        throw Error('Invalid password');
    }

    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET); // JWT_SECRET is a secret string used to decode the token

    res.json({user, token});
}