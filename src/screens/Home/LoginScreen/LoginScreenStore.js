import { observable } from "mobx";


export default class LoginScreenStore {
  @observable userName: string = '';
  @observable password: string = '';
  @observable remember: boolean = false;

  constructor() {

  }

  setUserName(userName: string) {
    this.userName = userName;
    console.log(this.userName);
  }

  setPassword(password: string) {
    this.password = password;
  }

  setRemember(remember: boolean) {
    this.remember = remember;
    console.log(this.remember);
  }

  login() {
    console.log('-------login');
  }
}
