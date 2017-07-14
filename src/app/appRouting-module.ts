import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { FaqComponent } from './faq/faq.component';
import { PrivayComponent } from './privay/privay.component';
import { TailorComponent } from './tailor/tailor.component';
import { DashboardComponent } from './tailor/dashboard/dashboard.component';
import { PostDesignComponent } from './tailor/post-design/post-design.component';
import { MyDesignComponent } from './tailor/my-design/my-design.component';
import { DetailComponent } from './tailor/detail/detail.component';
import { OrderComponent } from './tailor/order/order.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'privacy', component: PrivayComponent },
  { path: 'tailor', component: TailorComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'design', component: MyDesignComponent },
    { path: 'order', component: OrderComponent },
    { path: 'post', component: PostDesignComponent },
    { path: 'detail', component: DetailComponent }
    ]}
  ];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}