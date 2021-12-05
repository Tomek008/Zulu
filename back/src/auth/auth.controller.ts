import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { ForgotPassword, UserDto } from './user.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("/register")
    register(@Body() body: UserDto){
        return this.authService.register(body);
    }

    @Get("/login")
    login(@Body() body: LoginDto){
        return this.authService.login(body);
    }

    @Put("/update")
    update(@Body() body: ForgotPassword){
        return this.authService.update(body);
    }
}
