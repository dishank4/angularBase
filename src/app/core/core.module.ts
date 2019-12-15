import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorFilter } from './interceptor/httpErrorFilter.interceptor';
import { HttpFilter } from './interceptor/httpFilter.interceptor';
import { AuthGuard } from './services/authGuard.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorFilter, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpFilter, multi: true },
  ]
})
export class CoreModule { }
