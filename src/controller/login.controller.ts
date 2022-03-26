import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthenticationService} from "../service/authentication.service";
import {JwtAuthGuard} from "../security/jwt.authentication.guard";

@Controller("api/v1")
export class AppController {
    constructor(private authService: AuthenticationService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/login')
    async login(@Request() request) {
        return this.authService.login(request.user);
    }

}