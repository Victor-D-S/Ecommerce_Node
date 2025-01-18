import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";

export const signup = async (req: Request, res: Response, next:NextFunction) => {

    try {
        
        SignUpSchema.parse(req.body);
        const { email, password, name } = req.body;

        let user = await prismaClient.user.findFirst({where: {email}});
    
        if(user) {
            next(new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS));
        }
    
        user = await prismaClient.user.create({
            data: {
                email,
                password: hashSync(password, 10),
                name
            }
        })
    
        res.json(user);
    } catch (err:any) {
        next(new UnprocessableEntity(err?.issues, 'Unprocessable Entity', ErrorCode.UNPROCESSABLE_ENTITY));
    }
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