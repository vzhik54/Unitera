Окружение: для выполнения тестового задания использовал node.js + jest + puppeteer
Отчеты: allure

Запуск теста и генерацию отчета производил из powershell.

dyson.test.js - код теста

Установка фреймов для запуска теста:
1) Ставим node.js не ниже 8.
2) Создаем директорию с проектом тестов.
3) Ставим jest, puppeteer и jest-puppeteer в созданной директории:
npm install --save-dev jest-puppeteer puppeteer jest
4) Клонируем репозиторий в корень проекта.
5) Запускаем: yarn test или npm run test

Установка allure:
1) npm install --save-dev jest-allure 
Подробнее: https://github.com/zaqqaz/jest-allure
2) Установить CLI
Инструкция: https://github.com/allure-framework/allure2#download

Генерация отчета:
Просмотр в браузере:
allure serve
Сгенерировать html отчет:
allure generate