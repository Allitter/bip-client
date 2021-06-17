import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './user/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainLayoutComponent} from './user/main-layout/main-layout.component';
import {HomePageComponent} from './user/home-page/home-page.component';
import {FooterComponent} from './user/footer/footer.component';
import {MenuComponent} from './user/menu/menu.component';
import {SharedModule} from './shared/shared.module';
import {AuthInterceptor} from './shared/auth.interceptor';
import {AuthService} from './admin/service/auth.service';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

registerLocaleData(localeRu, 'ru');

// noinspection AngularInvalidImportedOrDeclaredSymbol
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLayoutComponent,
    HomePageComponent,
    FooterComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [INTERCEPTOR_PROVIDER, AuthService]
})
export class AppModule {
}
