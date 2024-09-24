import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { LoginService } from './login.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth:LoginService,
                private router:Router) {

    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot):
        Observable<boolean | UrlTree>  {

        return this.checkIfAuthenticated();

    }

    
    private checkIfAuthenticated() {
        return this.auth.isLoggedIn$
            .pipe(
                map(loggedIn =>
                    loggedIn? true: this.router.parseUrl('/login') )
            );
    }
}