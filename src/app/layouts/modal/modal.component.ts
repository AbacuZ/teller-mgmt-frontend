import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ModalService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  header: any = null;
  content: any = null;
  buttonContent: any = null;
  dangerStyle: Boolean = false;
  normalStyle: Boolean = false;
  isButtonEnabled: Boolean = false;
  subscription: Subscription;

  constructor(private modalService: ModalService,
    private router: Router) { }

  ngOnInit() {
    if (this.modalService.getModal().observers.length === 0) {
      this.subscription = this.modalService.getModal().subscribe((result: any) => {
        this.dangerStyle = result.dangerStyle;
        this.normalStyle = result.normalStyle;
        this.isButtonEnabled = result.isButtonEnabled;
        this.buttonContent = result.buttonContent;
        this.header = result.header;
        this.content = result.content;
        this.openModal();
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  openModal() {
    $('.open-modal').click();
  }

  closeModal(event: any) {
    const path = this.modalService.getRoute();
    if (path) {
      this.router.navigate([path]);
    }
    this.modalService.resetModal();
  }

  clickButton(event: any) {
    const path = this.modalService.getButtonRoute();
    if (path) {
      this.router.navigate([path]);
    }
    this.modalService.resetModal();
  }

}
