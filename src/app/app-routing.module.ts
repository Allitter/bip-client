import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from './user/main-layout/main-layout.component';
import {HomePageComponent} from './user/home-page/home-page.component';
import {AdminModule} from './admin/admin.module';
import {NewsInfoComponent} from './user/news-info/news-info.component';
import {PageInfoComponent} from './user/page-info/page-info.component';
import {AllNewsComponent} from './user/all-news/all-news.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'news', component: AllNewsComponent},
      {path: 'news/:id', component: NewsInfoComponent},
      {path: 'pages/:id', component: PageInfoComponent}
    ]
  },
  {path: 'admin', loadChildren: () => AdminModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
