import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef, ChangeDetectionStrategy, Output, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-component.component.html',
  styleUrls: ['./phone-component.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.ShadowDom
})
export class PhoneComponent implements OnInit {

  phoneFields: string[];
  phoneFieldHasFocus: boolean;
  canAdvancePhoneField: boolean;
  movedBetweenFields: boolean;

  @Input() fields: any[] = ["","",""];
  @Output() phoneNumberChanged: EventEmitter<string[]>;
  @ViewChild('userPhone0') userPhone0 : ElementRef;
  @ViewChild('userPhone1') userPhone1 : ElementRef;
  @ViewChild('userPhone2') userPhone2 : ElementRef;

  constructor(cdr: ChangeDetectorRef) {
    //cdr.detach();
    this.phoneNumberChanged = new EventEmitter<string[]>(),
      this.phoneFields = ["", "", ""],
      this.phoneFieldHasFocus = false,
      this.canAdvancePhoneField = false,
      this.movedBetweenFields = false
      this.phoneFieldKeyUp = this.phoneFieldKeyUp.bind(this);
  }

  ngOnInit() {
    this.phoneFields = this.fields.slice();
  }

  focusPhoneField = function () {
    this.phoneFieldHasFocus = true;
  }
  blurPhoneField = function () {
    this.phoneFieldHasFocus = false;
  }
  phoneFieldKeyUp = function (e: any, t: any) {

    //this.cdr.detectChanges();
    let n = e.key
      , r = e.srcElement || e.target;
    if (isNullOrUndefined(e.key) && this.phoneNumberChanged.emit(this.phoneFields)
    ,/[0-9]/.test(n)) {
      if (e.preventDefault(),
                r.value = r.value.trim(),
                this.phoneNumberChanged.emit(this.phoneFields),
                this.canAdvancePhoneField) {
      this.canAdvancePhoneField = !this.canAdvancePhoneField;
      let i = parseInt(r.attributes.maxlength.value, 4)
        , o = r.value.length;
      if (o >= i) {
        let s = t + 1;
        if (s <= 2) {
          //let a = document.getElementById("userPhone" + s);
          let a = (s === 0) ? this.userPhone0.nativeElement : (s === 1 ? this.userPhone1.nativeElement: this.userPhone2.nativeElement);
          a && (a.focus())
        }
      }
    }
  }
    else if (isNullOrUndefined(e.key) || "backspace" !== e.key.toLowerCase())
      if (!isNullOrUndefined(e.key) && "arrowleft" === e.key.toLowerCase() && this.movedBetweenFields) {
        this.movedBetweenFields = !this.movedBetweenFields;
        let l = t < 2 ? 3 : 4;
        r.setSelectionRange(l, l)
      } else
        !isNullOrUndefined(e.key) && "arrowright" === e.key.toLowerCase() && this.movedBetweenFields ? (this.movedBetweenFields = !this.movedBetweenFields,
          r.setSelectionRange(0, 0)) : /[0-9]/.test(this.phoneFields[t]), e.preventDefault();
    else
      this.phoneNumberChanged.emit(this.phoneFields)
  }
  phoneFieldKeyDown = function (e: any, t: any) {
    if (!isNullOrUndefined(e) && !isNullOrUndefined(e.key)) {
      this.canAdvancePhoneField = !this.canAdvancePhoneField;
      let n = e.srcElement || e.target;
      if ("backspace" === e.key.toLowerCase()) {
        if (0 === n.value.length) {
          let r = t - 1;
          if (r >= 0) {
            //let i = document.getElementById("userPhone" + r);
            let i = (r === 0) ? this.userPhone0.nativeElement : (r === 1 ? this.userPhone1.nativeElement: this.userPhone2.nativeElement);
            i && i.focus()
          }
        }
      } else if ("arrowleft" === e.key.toLowerCase()) {
        if (0 === n.selectionStart) {
          let r = t - 1;
          if (r >= 0) {
            //let i = document.getElementById("userPhone" + r);
            let i = (r === 0) ? this.userPhone0.nativeElement : (r === 1 ? this.userPhone1.nativeElement: this.userPhone2.nativeElement);
            i && (this.movedBetweenFields = !this.movedBetweenFields,
              i.focus())
          }
        }
      } else if ("arrowright" === e.key.toLowerCase() && (t < 2 && 3 === n.selectionStart || 2 === t && 4 === n.selectionStart)) {
        let r: number = t + 1;
        if (r <= 2) {
          //let i = document.getElementById("userPhone" + r);
          let i = (r === 0) ? this.userPhone0.nativeElement : (r === 1 ? this.userPhone1.nativeElement: this.userPhone2.nativeElement);
          i && (this.movedBetweenFields = !this.movedBetweenFields,
            i.focus())
        }
      }
    }
  }

}
