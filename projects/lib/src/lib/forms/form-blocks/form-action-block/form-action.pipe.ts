import { inject, Pipe, PipeTransform } from "@angular/core";
import { CeProcessingService } from "../../../services/ce-processing.service";

@Pipe({
    name: 'isActionPendingOrRunning',
    standalone: false
})
export class IsActionPendingOrRunningPipe implements PipeTransform {

    private processingService = inject(CeProcessingService)

    transform(status: string): boolean {        
        return this.processingService.isPendingOrRunning(status);
    }

}

@Pipe({
    name: 'isActionRunning',
    standalone: false
})
export class IsActionRunningPipe implements PipeTransform {

    private processingService = inject(CeProcessingService)

    transform(status: string): boolean {        
        return this.processingService.isRunning(status);
    }

}

@Pipe({
    name: 'isActionPending',
    standalone: false
})
export class IsActionPendingPipe implements PipeTransform {

    private processingService = inject(CeProcessingService)

    transform(status: string): boolean {        
        return this.processingService.isPending(status);
    }

}