import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  if(token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    })
  }
  return next(req)
};
