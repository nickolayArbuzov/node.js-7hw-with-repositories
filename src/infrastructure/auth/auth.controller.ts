import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res} from '@nestjs/common';
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

    @Post('refresh-token')
    refreshTokens(@Body() registrationEmailResendingDto: RegistrationEmailResendingDto ){
        return this.authService.refreshTokens()
    }

    @Post('logout')
    logout(@Body() registrationEmailResendingDto: RegistrationEmailResendingDto ){
        return this.authService.logout()
    }

    @Get('me')
    authMe(@Body() registrationEmailResendingDto: RegistrationEmailResendingDto ){
        return this.authService.authMe()
    }

}