import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthServiceService } from './services/auth-service.service';
import { UploadService } from './services/upload.service';

import { AppRoutingModule } from './appRouting-module';
import { CarouselModule } from 'angular4-carousel';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { FaqComponent } from './faq/faq.component';
import { PrivayComponent } from './privay/privay.component';
import { TailorComponent } from './tailor/tailor.component';
import { SidebarComponent } from './tailor/sidebar/sidebar.component';
import { DashboardComponent } from './tailor/dashboard/dashboard.component';
import { PostDesignComponent } from './tailor/post-design/post-design.component';
import { MyDesignComponent } from './tailor/my-design/my-design.component';
import { DetailComponent } from './tailor/detail/detail.component';
import { OrderComponent } from './tailor/order/order.component';
import { ClothComponent } from './cloth/cloth.component';
import { OrderDetailsComponent } from './tailor/order-details/order-details.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    FaqComponent,
    PrivayComponent,
    TailorComponent,
    SidebarComponent,
    DashboardComponent,
    PostDesignComponent,
    MyDesignComponent,
    DetailComponent,
    OrderComponent,
    ClothComponent,
    OrderDetailsComponent,
    SigninComponent,
    SignupComponent,
    ForgetPasswordComponent,
    EditDetailsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule
  ],
  providers: [AuthServiceService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
