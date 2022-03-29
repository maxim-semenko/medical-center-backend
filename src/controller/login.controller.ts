import {Body, ClassSerializerInterceptor, Controller, Inject, Post, Req, Request, UseGuards, UseInterceptors} from '@nestjs/common';
import {LoginDto, RegisterDto} from 'src/security/dto/dto';
import {AuthenticationService} from "../service/authentication.service";
import {UserAccessEntity} from "../entity/userAccess.entity";
import {JwtAuthGuard} from "../security/jwt.authentication.guard";

@Controller("api/v1")
export class AppController {

    @Inject(AuthenticationService)
    private readonly service: AuthenticationService;

    @Post('/register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: RegisterDto): Promise<UserAccessEntity | never> {
        return this.service.register(body);
    }

    @Post('/login')
    private login(@Body() body: LoginDto): Promise<string | never> {
        return this.service.login(body);
    }

    @Post('/refresh')
    @UseGuards(JwtAuthGuard)
    private refresh(@Req() user: Request): Promise<string | never> {   //???
        return this.service.refresh(<any>user);
    }

}