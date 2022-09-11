import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GraphQLModule } from './graphql.module';

import { HeaderComponent } from '@components/header/header.component';
import { ModalComponent } from '@components/modal/modal.component';
import { BoxCardComponent } from '@components/box-card/box-card.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { BoxListComponent } from '@pages/box-list/box-list.component';
import { BoxDetailsComponent } from '@pages/box-details/box-details.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    BoxCardComponent,
    BoxListComponent,
    BoxDetailsComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
