import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ForgotPassword, UserDto } from './user.dto';
import { LoginDto } from './login.dto';
import { UserRepository } from './user.repository';
import * as jwt from 'jsonwebtoken';
import { SecretConfiguration } from 'src/config/auth.config';
import {JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { JwtPayload } from 'jsonwebtoken';
import { getUserIdFromToken } from 'src/shared/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(data: UserDto) {
    const login = data.login;
    let user = await this.userRepository.findOne({ where: { login } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create(data);
    await this.userRepository.save(newUser);
    const response: any = {...newUser};
    return response;
  }

  async login(data: LoginDto) {
    const login = data.login;
    let user = await this.userRepository.findOne({ where: { login } });
    if (! user) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }
    if(user.password != data.password){
      throw new HttpException('Password is invalid', HttpStatus.BAD_REQUEST);
    }
    const response: any = {"token": this.create_token(user)};
    return response;
  }

  async update(data: ForgotPassword, req: any) {
    let id = await getUserIdFromToken(req)
    let user = await this.userRepository.findOne({ where: { id } });
    if(! user){
      throw new HttpException('There is no user with this id', HttpStatus.NOT_FOUND)
    }
    await this.userRepository.update({id}, {password: data.newPassword})
    const response: any = {...user};
    return response;
  }

  private create_token(user: User): string{
    const id = user.id;
    const username = user.username;
    return jwt.sign(
      {
        id,
        username,
      },
      SecretConfiguration.secret,
      { expiresIn: '7d' },
    ); 
  }

}