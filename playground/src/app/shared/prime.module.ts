import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    ChipsModule,
    DialogModule,
    DynamicDialogModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    TableModule,
    ToastModule,
    TagModule,
    AutoFocusModule,
    InputMaskModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrimeModule {}
