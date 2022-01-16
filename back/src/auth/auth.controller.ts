import { Body, Controller, Get, Logger, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { ForgotPassword, UserDto } from './user.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

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
    @UseGuards(new JwtAuthGuard())
    @Put("/update")
    update(@Req() request: Request, @Body() body: ForgotPassword){
        return this.authService.update(body, request.headers.authorization);
    }
}