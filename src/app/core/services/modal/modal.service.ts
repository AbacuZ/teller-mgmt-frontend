import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Modal } from './modal.modal';

@Injectable()
export class ModalService {

  isShowing = false;
  modal = new Subject();
  private modalData: Modal = new Modal();

  constructor() { }

  getModal() {
    return this.modal;
  }

  setHeader(data: string) {
    this.modalData.header = data;
  }

  setContent(data: string) {
    this.modalData.content = data;
  }

  setDangerStyle() {
    this.modalData.dangerStyle = true;
    this.modalData.normalStyle = false;
  }

  setNormalStyle() {
    this.modalData.normalStyle = true;
    this.modalData.dangerStyle = false;
  }

  setEnableButton(content: string) {
    this.modalData.isButtonEnabled = true;
    this.modalData.buttonContent = content;
  }

  setRoute(path: string) {
    this.modalData.path = path;
  }

  setRouteButton(path: string) {
    this.modalData.pathInButton = path;
  }

  getRoute() {
    return this.modalData.path;
  }

  getButtonRoute() {
    return this.modalData.pathInButton;
  }

  open() {
    this.modal.next(this.modalData);
  }

  close() {
    this.modal.next(this.modalData);
  }

  resetModal() {
    this.modalData.Clear();
  }

}
