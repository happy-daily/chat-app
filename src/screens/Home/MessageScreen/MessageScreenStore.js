import {action, observable} from "mobx";

export default class MessageScreenStore {
  @observable message: string = '';

  constructor() {

  }

  @action
  setMessage(message: string) {
    this.message = message;
  }
}
