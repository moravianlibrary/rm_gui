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
    const user = localStorage.getItem('currentUser') == null ? {
      roles: 'USER'
    } : localStorage.getItem('currentUser');
    return JSON.parse(JSON.stringify(user)).roles.indexOf(ADMIN) !== -1;
  }
}
