import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './component/admin-layout/admin-layout.component';
import {LoginPageComponent} from './component/login-page/login-page.component';
import {CreatePageComponent} from './component/create-page/create-page.component';
import {CreateNewsComponent} from './component/create-news/create-news.component';
import {EditPageComponent} from './component/edit-page/edit-page.component';
import {HeaderComponent} from './component/header/header.component';
import {NewsComponent} from './component/news/news.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './service/auth.guard';
import {ToastComponent} from './component/toast/toast.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EditNewsComponent} from './component/edit-news/edit-news.component';
import { CKEditorModule } from 'ckeditor4-angular';
import {SectionsComponent} from './component/sections/sections.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {DashboardService} from './service/dashboard.service';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    CreateNewsComponent,
    EditPageComponent,
    HeaderComponent,
    ToastComponent,
    NewsComponent,
    SectionsComponent,
    EditNewsComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CKEditorModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'news', component: NewsComponent, canActivate: [AuthGuard]},
          {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
          {path: 'sections', component: SectionsComponent, canActivate: [AuthGuard]},
          {path: 'create/page', component: CreatePageComponent, canActivate: [AuthGuard]},
          {path: 'create/news', component: CreateNewsComponent, canActivate: [AuthGuard]},
          {path: 'edit/news/:id', component: EditNewsComponent, canActivate: [AuthGuard]},
          {path: 'edit/page/:id', component: EditPageComponent, canActivate: [AuthGuard]},
        ]
      }
    ]),
    NgbModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard, DashboardService]
})
export class AdminModule {

}
