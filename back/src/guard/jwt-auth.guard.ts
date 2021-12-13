import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { SecretConfiguration } from 'src/config/auth.config';
import e from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request) {
          if (!request.headers.authorization) {
            return false;
          }
          if(validateToken(request.headers.authorization)){
              return true
          }    
          else{
              throw new HttpException("", HttpStatus.UNAUTHORIZED)
          }
        }
        return false;
    }

}
async function validateToken(auth: string): Promise<boolean> {
    const token = auth.split(' ')[1];
    try{
        const decoded =  await jwt.verify(token, SecretConfiguration.secret)
        return true
    }catch(error){
        return false
    }

}

