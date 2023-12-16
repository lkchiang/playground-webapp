import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { PlaygoundEditComponent } from './playground/playgound-edit/playgound-edit.component';

@NgModule({
  declarations: [
    HomeComponent,
    PlaygroundComponent,
    PlaygoundEditComponent
  ],
  imports: [CommonModule, SharedModule],
})
export class FeaturesModule {}
