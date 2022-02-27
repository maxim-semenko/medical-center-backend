import {ChiefDoctorService} from '../service/chiefDoctor.service';
import {ChiefDoctorEntity} from "../entity/chiefDoctor.entity";


@Controller('api/v1/chiefDoctor')
export class ChiefDoctorController {
    constructor(private readonly chiefDoctorService: ChiefDoctorService) {}

    @Get()
    findAll(): Promise<ChiefDoctorEntity[]> {
        return this.chiefDoctorService.findAll();
    }

}
