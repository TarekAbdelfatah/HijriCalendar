# نشر CoreComponents على الخادم

## المتطلبات

- Node.js 18+
- npm

## طريقة البناء

```bash
# بناء المشروع
npm run build
```

## طريقة النشر

### الطريقة الأولى: Serve (للاختبار المحلي)

```bash
# بعد البناء
npx serve dist -p 3000
```

### الطريقة الثانية: Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel
```

### الطريقة الثالثة: Netlify

```bash
# تثبيت Netlify CLI
npm i -g netlify-cli

# النشر
netlify deploy --prod --dir=dist
```

### الطريقة الرابعة: GitHub Pages

```bash
# إضافة スクリプト في package.json
"deploy": "npx vite build && npx gh-pages -d dist"

# التشغيل
npm run deploy
```

### الطريقة الخامسة: Surge.sh

```bash
# تثبيت
npm i -g surge

# النشر
npx vite build
surge dist/ your-project.surge.sh
```

## هيكل الملفات المبنية

```
dist/
├── index.html
├── packages/
│   ├── calendar/
│   │   └── demo/
│   │       └── index.html
│   └── theme/
│       └── src/
│           └── core-theme.css
└── assets/
```

## ملاحظات

- تأكد من تعيين `base` في `vite.config.ts` إذا كنت تنشر في مجلد فرعي
- dla production استخدم `npm run build` وليس `npm run start:vanilla`