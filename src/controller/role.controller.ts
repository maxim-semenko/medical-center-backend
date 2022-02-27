import {Controller,  Get} from '@nestjs/common';import {RoleService} from '../service/role.service';
import {RoleEntity} from "../entity/role.entity";

@Controller('api/v1/roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
    }

    @Get()
    findAll(): Promise<RoleEntity[]> {
        return this.roleService.findAll();
    }
}


