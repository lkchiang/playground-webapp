import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeModule } from './prime.module';
import { NavigatorComponent } from './navigator/navigator.component';
import { NotificatorComponent } from './notificator/notificator.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    NavigatorComponent,
    NotificatorComponent
  ],
  imports: [
    PrimeModule, 
    CommonModule, 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [
    NavigatorComponent,
    NotificatorComponent,
    PrimeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
