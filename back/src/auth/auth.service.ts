import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { ForgotPassword, UserDto } from './user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository, 

  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.authService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async findOne(login: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: {login}})
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


  async login(data: LoginDto){
    const login = data.login;
    let user = await this.userRepository.findOne({ where: { login } });
    if (! user) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }

    if(user.password != data.password){
      throw new HttpException('Password is invalid', HttpStatus.BAD_REQUEST);
    }
    const response: any = {...user};
    return response;
  }

  async update(data: ForgotPassword){
    const id = data.id
    const user = this.userRepository.findOne({ where: { id }});
    if(! user){
      throw new HttpException('There is no user with this id', HttpStatus.NOT_FOUND)
    }
    await this.userRepository.update({id}, {password: data.newPassword})
    const response: any = {...user};
    return response;

  }
}