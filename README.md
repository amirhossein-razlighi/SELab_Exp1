
# آزمایش اول از آزمایشگاه مهندسی نرم‌افزار


### گزارش آزمایش اول: مدیریت نسخ پروژه، یکپارچه‌سازی و استقرار مستمر

**ابزارهای مورد استفاده:**
- Git
- Node.js
- GitHub و GitHub Actions

---

#### مراحل انجام آزمایش

**ایجاد مخزن در GitHub**
   - وارد حساب گیت‌هاب شدیم و یک مخزن جدید با نام `SELab_Exp1` ایجاد کردیم.

**راه‌اندازی اولیه Git**
   - دستورات زیر را برای ایجاد مخزن و ارسال اولین کامیت وارد کردیم:
     ```bash
     echo "#SELab_Exp1" >> README.md
     git init
     git add README.md
     git commit -m "first commit"
     git branch -M main
     git remote add origin https://github.com/amirhossein-razlighi/SELab_Exp1
     git push -u origin main
     ```

**HTML Files**

     -    index.html: serves as the main page.
     -    menu.html and gallery.html: for menu and gallery content.

**CSS and JavaScript Files**

     -    style.css: For styling the HTML structure.
     -    main.js: Contains JavaScript code, likely for adding interactivity.

**استقرار خودکار با GitHub Actions**
   - یک گردش‌کار GitHub Actions ایجاد کردیم تا پروژه به‌طور خودکار در GitHub Pages مستقر شود و هنگام پوش به شاخه `main` به‌روزرسانی شود. پیکربندی شامل مراحل نصب وابستگی‌ها، ساخت پروژه و استقرار بود. بخش اصلی به صورت زیر است:
     ```yaml
     # Simple workflow for deploying static content to GitHub Pages
     name: Deploy static content to Pages
     on:
     # Runs on pushes targeting the default branch
     push:
     branches: ["main"]

     # Allows you to run this workflow manually from the Actions tab
     workflow_dispatch:

     # Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
     permissions:
     contents: read
     pages: write
     id-token: write

     # Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
     # However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
     concurrency:
     group: "pages"
     cancel-in-progress: false

     jobs:
     # Single deploy job since we're just deploying
     deploy:
     environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
     runs-on: ubuntu-latest
     steps:
       - name: Checkout
        uses: actions/checkout@v4
        - name: Setup Pages
        uses: actions/configure-pages@v5
        - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload entire repository
          path: '.'
        - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
     ```
---

#### مدیریت شاخه‌ها

**شاخه توسعه (dev)**
   - **توسعه HTML و JavaScript:** بهبود ساختار HTML و افزودن قابلیت‌های تعاملی JavaScript با توجه به اهداف تعامل کاربر و واکنش‌گرایی.
   - **GitHub Actions:** اضافه کردن گردش‌کارهای سفارشی جهت تست تغییرات در `dev` و اطمینان از موفقیت در ساخت‌ها قبل از ادغام با شاخه اصلی.

**شاخه رفع خطا (hotfix)**
   - **حل مشکلات:** اعمال اصلاحات خاص برای رفع باگ‌های جزئی در برنامه، با تمرکز بر منطق JavaScript و نمایش HTML.
   - **تست:** بررسی تغییرات با گردش‌کارهای موقت برای جلوگیری از استقرار قبل از تست کامل.

**rebase  و همگام‌سازی با شاخه اصلی**
   - **فرآیند ری‌بیس:** به‌صورت دوره‌ای از شاخه `main` ری‌بیس انجام دادیم تا شاخه‌های `dev` و `hotfix` به‌روز شوند، از دستورات زیر استفاده شد:
     ```bash
     git checkout dev
     git rebase main
     ```
   - **درخواست‌های pull و ادغام:** برای شفافیت، به‌روزرسانی‌ها را از طریق درخواست‌های pull نهایی کرده و تنها پس از ری‌بیس و تست موفق، به `main` ادغام کردیم.

---

## مفاهیم و دستورات اصلی Git

### ۱. پوشه‌ی `.git` چیست؟ چه اطلاعاتی در آن ذخیره می‌شود؟ چگونه ایجاد می‌شود؟

پوشه‌ی `.git` یک دایرکتوری مخفی است که تمام اطلاعات مربوط به مخزن Git را شامل می‌شود. این اطلاعات شامل تاریخچه‌ی commit‌ها، برنچ‌ها، تگ‌ها، تنظیمات مخزن و داده‌های مرتبط با مدیریت نسخه‌ها است. این پوشه با استفاده از دستور زیر ایجاد می‌شود:

```bash
git init
```

---

### ۲. منظور از atomic بودن در atomic commit و atomic pull-request چیست؟

در Git، **اتمیک بودن** به معنای اعمال تغییرات به صورت یکپارچه و کامل است. به این معنی که یا تمام تغییرات با هم اعمال می‌شوند یا هیچ‌کدام. این ویژگی برای اطمینان از سازگاری و یکپارچگی تغییرات استفاده می‌شود.

---

### ۳. تفاوت دستورهای `fetch`، `pull`، `merge`، `rebase` و `cherry-pick` چیست؟

- **`git fetch`**: تغییرات را از مخزن remote دریافت کرده و در مخزن local ذخیره می‌کند، بدون به‌روزرسانی برنچ‌ها.
- **`git pull`**: تغییرات را از مخزن remote دریافت کرده و در برنچ فعلی ادغام می‌کند (عملکرد fetch + merge).
- **`git merge`**: تغییرات یک برنچ را به برنچ فعلی ادغام می‌کند.
- **`git rebase`**: تغییرات یک برنچ را به انتهای تاریخچه‌ی برنچ دیگری منتقل کرده و تاریخچه commit‌ها را به صورت خطی نمایش می‌دهد.
- **`git cherry-pick`**: یک یا چند commit مشخص از یک برنچ را به برنچ دیگری اعمال می‌کند.

---

### ۴. تفاوت دستورهای `reset`، `revert`، `restore`، `switch` و `checkout` چیست؟

- **`git reset`**: commit‌ها و تغییرات را به حالت قبلی بازمی‌گرداند و آنها را از مرحله staging خارج می‌کند.
- **`git revert`**: تغییرات یک commit خاص را به حالت قبلی بازمی‌گرداند و یک commit جدید ایجاد می‌کند.
- **`git restore`**: فایل‌های تغییر یافته را به حالت قبلی بازمی‌گرداند.
- **`git switch`**: برای جابه‌جایی بین برنچ‌ها استفاده می‌شود.
- **`git checkout`**: برای جابه‌جایی بین برنچ‌ها و همچنین بازگرداندن فایل‌ها به حالت commit‌های قبلی استفاده می‌شود.

---

### ۵. منظور از stage یا همان index چیست؟ دستور `stash` چه کاری انجام می‌دهد؟

**Stage** (یا **Index**) محلی موقت برای ذخیره تغییراتی است که قرار است commit شوند. دستور `git stash` تغییرات فعلی را ذخیره کرده و پروژه را به آخرین commit برمی‌گرداند، در حالی که تغییرات ذخیره‌شده در مرحله stash باقی می‌مانند.

---

### ۶. مفهوم snapshot به چه معناست؟ ارتباط آن با commit چیست؟

**Snapshot** به معنای تصویری از وضعیت فایل‌های پروژه در یک لحظه خاص است. در Git، هر commit یک snapshot از تمامی فایل‌های پروژه در آن لحظه ذخیره می‌کند. به عبارت دیگر، هر commit در Git شامل یک snapshot از فایل‌های پروژه است.

---

### ۷. تفاوت‌های local repository و remote repository چیست؟

- **Local repository**: مخزنی است که روی سیستم محلی کاربر قرار دارد و تمامی تغییرات به صورت محلی در آن ثبت می‌شود.
- **Remote repository**: مخزنی است که روی یک سرور از راه دور (مانند GitHub) قرار دارد و معمولاً برای اشتراک‌گذاری و همکاری بین چندین کاربر استفاده می‌شود.