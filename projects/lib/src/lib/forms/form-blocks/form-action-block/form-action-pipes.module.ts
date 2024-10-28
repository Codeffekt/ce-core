import { NgModule } from "@angular/core";
import { IsActionPendingOrRunningPipe, IsActionPendingPipe, IsActionRunningPipe } from "./form-action.pipe";

@NgModule({
    declarations: [
        IsActionRunningPipe,
        IsActionPendingOrRunningPipe,
        IsActionPendingPipe,
    ],
    exports: [
        IsActionRunningPipe,
        IsActionPendingOrRunningPipe,
        IsActionPendingPipe,
    ]
})
export class FormActionPipesModule {

}
