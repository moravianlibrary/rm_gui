import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ADMIN} from '../roles';


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean>
    | Promise<boolean>
    | boolean {
    const user = localStorage.getItem('currentUser') == null ? JSON.stringify({
      roles: 'USER'
    }) : localStorage.getItem('currentUser');
    return JSON.parse(user).roles.indexOf(ADMIN) !== -1;
  }
}
