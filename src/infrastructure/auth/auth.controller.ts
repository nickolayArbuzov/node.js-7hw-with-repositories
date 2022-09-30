import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, Res, UseGuards} from '@nestjs/common';
import { Cookies } from '../customdecorators/current.user.decorator';
import { JWTGuard } from '../guards/jwt.guard';
import {AuthService} from "./auth.service";
import { AuthDto, RegistrationConfirmationDto, RegistrationDto, RegistrationEmailResendingDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('login')
    async login(@Body() authDto: AuthDto,  @Res({ passthrough: true }) res){
        const result = await this.authService.login(authDto)

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
        });

        return { accessToken: result.accessToken };
    }

    @HttpCode(204)
    @Post('registration')
    registration(@Body() registrationDto: RegistrationDto ){
        return this.authService.registration(registrationDto)
    }

    @HttpCode(204)
    @Post('registration-confirmation')
    registrationConfirmation(@Body() registrationConfirmationDto: RegistrationConfirmationDto ){
        return this.authService.registrationConfirmation(registrationConfirmationDto)
    }

    @HttpCode(204)
    @Post('registration-email-resending')
    registrationEmailResending(@Body() registrationEmailResendingDto: RegistrationEmailResendingDto ){
        return this.authService.registrationEmailResending(registrationEmailResendingDto)
    }

    @HttpCode(200)
    @UseGuards(JWTGuard)
    @Post('refresh-token')
    async refreshTokens(@Cookies() cookie, @Res({ passthrough: true }) res){
        const result = await this.authService.refreshTokens(cookie.refreshToken)

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
        });

        return { accessToken: result.accessToken };
    }

    @HttpCode(204)
    @UseGuards(JWTGuard)
    @Post('logout')
    logout(@Cookies() cookie){
        return this.authService.logout(cookie.refreshToken)
    }

    @UseGuards(JWTGuard)
    @Get('me')
    getAuthMe(@Cookies() cookie){
        console.log('getAuthMe')
        return this.authService.authMe(cookie.refreshToken)
    }

    @UseGuards(JWTGuard)
    @Post('me')
    authMe(@Cookies() cookie){
        console.log('postAuthMe')
        return this.authService.authMe(cookie.refreshToken)
    }

}