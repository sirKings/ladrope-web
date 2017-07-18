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
import { OrderDetailsComponent } from './tailor/order-details/order-details.component';
import { ClothComponent } from './cloth/cloth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'privacy', component: PrivayComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password', component: ForgetPasswordComponent },
  { path: 'tailor', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'tailor/:id', component: TailorComponent, children: [
    { path: '', redirectTo: 'detail', pathMatch: 'full' },
    { path: 'design', component: MyDesignComponent },
    { path: 'design/:id', component: ClothComponent},
    { path: 'order', component: OrderComponent },
    { path: 'order/:id', component: OrderDetailsComponent },
    { path: 'post', component: PostDesignComponent },
    { path: 'edit-detail', component: EditDetailsComponent },
    { path: 'detail', component: DetailComponent }
    ]}
  ];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}