import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {Loginresponse} from "./auth/login/loginresponse";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {


  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const jwtToken = this.authService.getJwtToken();
    if(jwtToken){
      this.addToken(req,jwtToken);
    }
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse
        && error.status === 403) {
        return this.handleAuthErrors(req, next);
      } else {
        return throwError(error);
      }
    }));

    // if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
    //   return next.handle(req);
    // }
    // const jwtToken = this.authService.getJwtToken();
    //
    // if (jwtToken) {
    //   return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
    //     if (error instanceof HttpErrorResponse
    //       && error.status === 403) {
    //       return this.handleAuthErrors(req, next);
    //     } else {
    //       return throwError(error);
    //     }
    //   }));
    // }
    // return next.handle(req);

  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: Loginresponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject
            .next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(req,
            this.authService.getJwtToken()))
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req,
            this.authService.getJwtToken()))
        })
      );
    }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      })
    });
  }


}