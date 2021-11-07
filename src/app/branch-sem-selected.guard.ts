import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserSettingsService } from './user-settings.service';

@Injectable({
  providedIn: 'root',
})
export class BranchSemSelectedGuard implements CanActivate {
  constructor(
    private userSettingsService: UserSettingsService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userSettingsService.isBranchSemSet()) {
      return true;
    } else {
      return this.router.createUrlTree(['/profile']);
    }
  }
}
