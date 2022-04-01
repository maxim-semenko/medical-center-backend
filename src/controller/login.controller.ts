import {Body, ClassSerializerInterceptor, Controller, Inject, Post, UseInterceptors} from '@nestjs/common';
import {LoginDto, RegisterDto} from 'src/security/dto/dto';
import {AuthenticationService} from "../service/authentication.service";
import {UserEntity} from "../entity/user.entity";
import {getConnection} from "typeorm";

@Controller("api/v1")
export class AppController {

    @Inject(AuthenticationService)
    private readonly service: AuthenticationService;

    @Post('/register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: RegisterDto): Promise<UserEntity | never> {
        return getConnection().transaction(transactionManager => {
            return this.service.register(
                body,
                transactionManager
            );
        });
    }

    @Post('/login')
    private login(@Body() body: LoginDto): Promise<string | never> {
        return this.service.login(body);
    }

}