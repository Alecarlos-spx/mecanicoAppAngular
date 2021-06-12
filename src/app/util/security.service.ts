import { User } from "../models/user.model";

export class SecurityService {


  public static set(user: User, token: string) {
    const data = JSON.stringify(user);

    sessionStorage.setItem('mecanicouser', btoa(data));
    sessionStorage.setItem('mecanicotoken', token)
  }

  public static setUSer(user: User){
    const data = JSON.stringify(user);
    sessionStorage.setItem('mecanicouser', btoa(data));
  }

  public static setToken(token: string){
    sessionStorage.setItem('mecanicotoken', token);

  }

  public static getUser(): User {
    const data = sessionStorage.getItem('mecanicouser');
    if(data){
        return JSON.parse(atob(data));
    }else {
        return null;
    }
  }

  public static getToken(): string {
    const data = sessionStorage.getItem('mecanicotoken');
    if(data){
        return data;
    }else{
        return null;
    }
  }

  public static hasToken(): boolean{
    if(this.getToken()){
        return true;
    }else{
        return false;
    }
  }

  public static clear(){
    sessionStorage.removeItem('mecanicouser');
    sessionStorage.removeItem('mecanicotoken');
  }


}
