import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, Res, UseGuards} from '@nestjs/common';
import { Cookies } from '../customdecorators/cookie.decorator';
import { AttemptsGuard } from '../guards/attempts.guard';
import { JWTGuard } from '../guards/jwt.guard';
import {AuthService} from "./auth.service";
import { AuthDto, RegistrationConfirmationDto, RegistrationDto, RegistrationEmailResendingDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @UseGuards(AttemptsGuard)
    @Post('login')
    async login(@Body() authDto: AuthDto,  @Res({ passthrough: true }) res, @Req() req){
        
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
    getAuthMe(@Req() req){
        return this.authService.authMe(req.user.id)
    }

}