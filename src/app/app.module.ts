import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './appRouting-module';

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
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
