import { JwtPayload } from "jsonwebtoken";
import * as jwt from 'jsonwebtoken';

export async function getUserIdFromToken(auth: string): Promise<any> {
    const token = auth.split(' ')[1];
    const user = await jwt.decode(token)
    return (user as JwtPayload).id
}

export function ensureOwnership(userId: any, authorObjectId: any){
    return userId == authorObjectId
}