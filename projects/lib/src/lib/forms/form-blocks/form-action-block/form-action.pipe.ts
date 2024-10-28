import { inject, Pipe, PipeTransform } from "@angular/core";
import { CeProcessingService } from "../../../services/ce-processing.service";

@Pipe({ name: 'isActionPendingOrRunning'})
export class IsActionPendingOrRunningPipe implements PipeTransform {

    private processingService = inject(CeProcessingService)

    transform(status: string): boolean {        
        return this.processingService.isPendingOrRunning(status);
    }

}

@Pipe({ name: 'isActionRunning'})
export class IsActionRunningPipe implements PipeTransform {

    private processingService = inject(CeProcessingService)

    transform(status: string): boolean {        
        return this.processingService.isRunning(status);
    }

}

@Pipe({ name: 'isActionPending'})
export class IsActionPendingPipe implements PipeTransform {

    private processingService = inject(CeProcessingService)

    transform(status: string): boolean {        
        return this.processingService.isPending(status);
    }

}