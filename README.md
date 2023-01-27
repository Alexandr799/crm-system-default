# CRM

## [ ССЫЛКА НА ЗАДЕПЛОИНОЕ ПРИЛОЖЕНИЕ](https://crm.alexstrigo.ru)

Данный проект это CRM-система

ВОЗМОЖНОСТИ:

- Просмотр списка людей в виде таблицы
- Добавление нового клиента
- Изменение информации о существующем клиенте

Каждый контакт представляет из себя следующий набор данных:

- Имя
- Фамилия
- Отчество
- Массив объектов с контактными данными

### Интерфейс

Интерфейс представляет из себя единственную страницу, на которой располагается
таблица клиентов, кнопка для добавления нового клиента, а также шапка с логотипом и поиском по базе клиентов
У каждого клиента кнопки для удаление и редактирования информации

Данное приложение выполненно на чистом JS + CSS без каких либо фреймворков и библиотек (Кроме cборки на webpack);

### Запуск

#### Запуск работы backend:
Перейдите в директорию backend и запустите из консоли скрипты

1. `  npm i ` - для установки зависимостей

2. ` npm start  ` - для запуска сервера

#### Запуск работы frontend:
Перейдите в директорию frontend и запустите из консоли скрипты

1. `  npm i ` - для установки зависимостей

2. `	 npm run dev  ` - для запуска в режиме девелопера или `npm run build` - для production build
