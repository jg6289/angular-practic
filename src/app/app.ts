import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChoiceField, ChoiceOption } from './choice-field/choice-field';

@Component({
  selector: 'app-root',
  imports: [ChoiceField, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.html',
})
export class App {
  statuses: ChoiceOption[] = [
    { value: 'all', label: '全部' },
    { value: 'active', label: '啟用中' },
    { value: 'off', label: '已停用' },
  ];
  depts: ChoiceOption[] = [
    { value: 'rd', label: '研發部' },
    { value: 'sales', label: '業務部' },
    { value: 'admin', label: '管理部' },
  ];

  // 必填由表單的 Validators.required 判斷
  form = new FormGroup({
    status: new FormControl<string | null>('active', Validators.required),
    dept: new FormControl<string | null>(null, Validators.required),

    status2: new FormControl<string | null>('all', Validators.required),
    dept2: new FormControl<string | null>(null, Validators.required),
  });

  search() {
    this.form.markAllAsTouched();   // 按下查詢：所有欄位一起顯示錯誤
  }
}