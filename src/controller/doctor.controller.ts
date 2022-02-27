import {DoctorService} from '../service/doctor.service';
import {DoctorEntity} from "../entity/doctor.entity";

@Controller('api/v1/doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @Get()
    findAll(): Promise<DoctorEntity[]> {
        return this.doctorService.findAll();
    }

}
