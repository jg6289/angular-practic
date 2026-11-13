# choice-dev：sf-choice-field 元件開發環境

Angular 20.3 + Tailwind CSS 4.1（不含 preflight，與日後封裝的元件庫設定相同）

## 啟動
```bash
npm install
npx ng serve
```
開啟 http://localhost:4200 即可看到展示頁，修改元件存檔後會自動更新。

## 結構
```
src/
├─ styles.css                     Tailwind 設定（theme + utilities，不含 preflight）
└─ app/
   ├─ choice-field/               元件本體，之後整個資料夾搬進元件庫
   │  ├─ choice-field.ts
   │  └─ choice-field.html
   └─ app.ts / app.html / app.css 展示頁（只用來開發，不屬於元件）
.postcssrc.json                   讓 Angular 透過 PostCSS 執行 Tailwind
```

## 開發原則（方便之後封裝）
- `choice-field/` 不引用專案裡的其他檔案
- 外觀一律寫成 `var(--sf-*, 預設值)`，例如 `rounded-[var(--sf-radius,6px)]`
- 不要在 `styles.css` 改回 `@import "tailwindcss"`（會載入 preflight）

## 目前進度
- [x] 共用外框：標題區／控制區／說明區、labelPosition top／start
- [x] button-group：options、value、disabled、必填錯誤（雛形）
- [ ] ControlValueAccessor（接 formControl）
- [ ] multiple
- [ ] 鍵盤操作
- [ ] select（CDK Overlay）
- [ ] popover
