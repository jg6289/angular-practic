import { Component, signal } from '@angular/core';
import { ChoiceField, ChoiceOption } from './choice-field/choice-field';

@Component({
  selector: 'app-root',
  imports: [ChoiceField],
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
  cities: ChoiceOption[] = [
    { value: 'tpe', label: '台北市' },
    { value: 'ntpc', label: '新北市' },
    { value: 'tyn', label: '桃園市' },
    { value: 'txg', label: '台中市' },
    { value: 'tnn', label: '台南市' },
    { value: 'khh', label: '高雄市' },
    { value: 'ila', label: '宜蘭縣' },
    { value: 'hsz', label: '新竹市' },
  ];

  // 每個元件目前選中的值
  status = signal<string | null>('active');
  dept = signal<string | null>(null);
  city = signal<string | null>(null);
}