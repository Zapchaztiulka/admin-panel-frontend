# Admin panel for the "Zapchaztiulka" store (frontend) 
Репозиторій для фронтенд-розробки адмін панелі та чат-боту.

## Матеріали та інструменти
Цей додаток:
- зібраний за допомогою [Vite](https://vite-docs-ru.vercel.app/),
- включає використання [backend](https://github.com/Zapchaztiulka/spares-backend) та [універсальних компонентів](https://github.com/Zapchaztiulka/universal-components-frontend), 
- стилізований з [Tailwind CSS](https://tailwindcss.com/).

Тут знаходиться: [макет (сторінка "Admin panel")](https://www.figma.com/file/ahUh3DaGTm5nEVD1QjglAK/%E2%9A%99-Zapchaztiulka?node-id=23%3A2318&mode=dev). 

## Початок роботи
1. Встанови базові залежності проекту командою `npm install`.
2. Створи файл .env та вкажи необхідні змінні.
3. Запусти режим розробки, виконавши команду `npm run dev`.
4. Перейдіть до браузера за вказаним посиланням localhost.
   Ця сторінка автоматично перезавантажуватиметься після збереження змін у файли проекту.



## Створення нового api
1 Якщо немає потрібної категорії в services/api/endpoints, створити файл `%category%.js`
2 У файлі категорій створити необхідні нові запити до api та додати експорт
3 Якщо було створено новий файл категорій, необхідно оновити `services/api/index.js`

## Робота з існуючим API
1 Імпортувати готовий єндпоінту  `import api from "service/api"`

2 Для виклику ендпоінту з обраної категорії  -  `await api.users.register(data);`
