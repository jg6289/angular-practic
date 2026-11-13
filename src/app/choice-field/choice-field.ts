import { Component, ElementRef, computed, inject, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export interface ChoiceOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'sf-choice-field',
  templateUrl: './choice-field.html',
  host: {
    class: 'group block',
    '[attr.data-invalid]': "invalid ? 'true' : null",
  },
})  
export class ChoiceField implements ControlValueAccessor {
  displayMode = input<'button-group' | 'select'>('select');
  options = input<ChoiceOption[]>([]);
  value = model<string | null>(null);
  disabled = input(false);
  placeholder = input('請選擇');

  private host = inject(ElementRef<HTMLElement>);
  private formDisabled = signal(false);
  protected isDisabled = computed(() => this.disabled() || this.formDisabled());

  // select 模式：面板是否展開、觸發框要顯示的文字
  protected open = signal(false);
  protected selectedLabel = computed(
    () => this.options().find(o => o.value === this.value())?.label ?? null,
  );

  // ===== 表單串接 =====
  // 取得使用者綁定的表單控制項（formControl / formControlName / ngModel）
  private ngControl = inject(NgControl, { self: true, optional: true });

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  // 驗證失敗且已操作過 → 邊框變紅（錯誤訊息由使用者自己顯示）
  get invalid(): boolean {
    return !!(this.ngControl?.invalid && this.ngControl?.touched);
  }

  private onChange: (v: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: string | null): void {
    this.value.set(v ?? null);
  }
  registerOnChange(fn: (v: string | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  // ===== 互動 =====
  protected pick(v: string) {
    // button-group：再點一次可取消；select：直接選定並收起面板
    const next = this.displayMode() === 'button-group' && this.value() === v ? null : v;
    this.value.set(next);
    this.onChange(next);
    this.open.set(false);
    this.onTouched();
  }

  protected toggle() {
    this.open.update(o => !o);
  }

  // 焦點離開整個元件時：收起面板、通知表單已操作過
  protected onFocusOut(e: FocusEvent) {
    const to = e.relatedTarget as Node | null;
    if (!to || !this.host.nativeElement.contains(to)) {
      this.open.set(false);
      this.onTouched();
    }
  }
}