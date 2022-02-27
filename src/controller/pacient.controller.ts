import {PacientService} from '../service/pacient.service';
import {PacientUserEntity} from "../entity/pacient.entity";

@Controller('api/v1/pacient')
export class PacientController {
    constructor(private readonly pacientService: PacientService) {}

    @Get()
    findAll(): Promise<PacientEntity[]> {
        return this.pacientService.findAll();
    }

}
