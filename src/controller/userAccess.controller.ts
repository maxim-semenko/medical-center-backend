import {Controller,  Get} from '@nestjs/common';
import {UserAccessService} from '../service/userAccess.service';
import {UserAccessEntity} from "../entity/userAccess.entity";

@Controller('api/v1/userAccesses')
export class UserAccessController {
    constructor(private readonly userAccessService: UserAccessService) {
    }

    @Get()
    findAll(): Promise<UserAccessEntity[]> {
        return this.userAccessService.findAll();
    }
}


