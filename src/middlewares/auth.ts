import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {

    const token = req.headers.authorization;

    if(!token) {
        next(new UnauthorizedException("Token not found", ErrorCode.UNAUTHORIZED));
    }

    try {

        const payload = jwt.verify(token, JWT_SECRET) as any;

        // Vai pegar o id do usuário que está no token e vai buscar no banco de dados
        const user = await prismaClient.user.findFirst({where: {id: payload.userId}});

        if(!user) {
            next(new UnauthorizedException("User not found", ErrorCode.UNAUTHORIZED));
        }

        req.user = user;
        next();
    } catch(error) {

        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
}

export default authMiddleware;