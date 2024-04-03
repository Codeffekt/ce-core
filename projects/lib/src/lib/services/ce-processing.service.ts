import { Injectable } from "@angular/core";
import { CeCoreService } from "./ce-core.service";
import { IndexType } from "@codeffekt/ce-core-data";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CeProcessingService {

    constructor(private coreService: CeCoreService) { }

    start(pid: IndexType) {
        return firstValueFrom(this.coreService.callProcessing("start", pid));
    }

    cancel(pid: IndexType) {
        return firstValueFrom(this.coreService.callProcessing("cancel", pid));
    }

    status(pid: IndexType) {
        return firstValueFrom(this.coreService.callProcessing("status", pid));
    }
}