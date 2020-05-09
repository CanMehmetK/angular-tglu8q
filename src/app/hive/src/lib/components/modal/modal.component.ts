import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'system-modal',
  template: `<div class="kanpinar-modal">
      <mat-card [style.max-width]="width" style="padding:0">
        <ng-content></ng-content>
      </mat-card>
    </div>
    <div class="system-modal-background"></div>`,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() width: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
    if (!this.width) {
      this.width = '99%';
    }
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (e: any) => {
      if (e.target.className === 'kanpinar-modal') {
        // modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('system-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('system-modal-open');
  }
}
