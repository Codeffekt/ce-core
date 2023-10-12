import { Directive, ElementRef, HostListener, Output, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Directive({
  selector: '[ngReallyClick]'
})
export class NgReallyClickDirective {

  @Output('ngReallyClick') ngReallyClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() ngReallyMessage: string = "Are You Sure ?";
  @Input() ngReallyTitle: string = "Confirmation Dialog";

  constructor(private dialog: MatDialog, private el: ElementRef) { 
  }

  @HostListener('click') onClick() {
    this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, 
        {
          width: '250px',
          data: { title: this.ngReallyTitle, message: this.ngReallyMessage }
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.ngReallyClick.emit(true);
      }
    });
  }

}
