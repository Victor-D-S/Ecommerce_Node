import { Request, Response } from "express";
import { AddressSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
import { prismaClient } from "..";

export const addAdress = async (req: Request, res: Response) => {

    AddressSchema.parse(req.body);

    let user: User;

    try {

        user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: +req.body.userId
            }
        })

    } catch(err) {
     
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId: user.id
        }
    })

    res.json(address);
}

export const deleteAdress = async (req: Request, res: Response) => {
    
}

export const listAdress = async (req: Request, res: Response) => {
    
}