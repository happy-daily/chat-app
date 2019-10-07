import { observable, action } from 'mobx';

export default class ChatScreenStore {
  @observable item = [];
  @observable login: boolean = false;

}
