import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PhoneComponent } from './phone-component/phone-component.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    PhoneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  entryComponents:[PhoneComponent],
  providers: [],
})
export class AppModule {
  constructor(injector: Injector) {
    const acc = createCustomElement(PhoneComponent, { injector });
    customElements.define('app-phone-number',acc);
 }
 ngDoBootstrap() {}
}
