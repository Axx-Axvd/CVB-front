# API Integration Platform

Проект предназначен для отправки уведомлений по электронной почте с использованием шаблонов, а также для генерации QR-кодов, указывающих на созданные объекты уведомлений.

## Функциональные возможности
1. Создание уведомлений на основе шаблонов.
2. Отправка уведомлений по email через EmailJS.
3. Генерация QR-кода, указывающего на созданное уведомление.

## Инструкции по запуску
# Требования
* Node.js версии 14.x или выше.
* NPM (Node Package Manager).

### Установка

1. Клонируйте репозиторий
`git clone https://github.com/<ваш-репозиторий>/api-integration-platform.git`

3. Перейдите в директорию проекта
`cd api-integration-platform`

4. Запустите приложение
`npm start`

5. Приожение будет доступно по адресу `http://localhost:3000`

## Инструкции по проверке бизнес-логики

### Шаблоны уведомлений

Приложение поддерживает два шаблона:
1. Приветствие
`Привет, <b>%UserName%</b>, твой заказ №%OrderNumber% готов!`

#Параметры:
* UserName: Имя пользователя.
* OrderNumber: Номер заказа.

3. Напоминание
`Здравствуйте, %UserName%! Напоминаем, что событие %EventName% начнётся %EventDate%.`

### Параметры:
* UserName: Имя пользователя.
* EventName: Название события.
* EventDate: Дата события.

## Тестовые сценарии

1. Шаблон "Приветствие"

* Введите email получателя: test@example.com.
* Выберите шаблон "Приветствие".
* Укажите параметры:
  * :UserName:: Иван.
  * :OrderNumber:: 12345.

Ожидаемый результат:
`Привет, <b>Иван</b>, твой заказ №12345 готов!`

2. Шаблон "Напоминание"

* Введите email получателя: `test@example.com`.
* Выберите шаблон "Напоминание".
* Укажите параметры:
  * :UserName:: Елена.
  * :EventName:: Встреча с клиентом.
  * :EventDate:: 2025-01-21.

Ожидаемый резальтат:
`Здравствуйте, <b>Елена</b>! Напоминаем, что событие <b>Встреча с клиентом</b> начнётся <b>2025-01-21</b>.`

### QR-код указывает на URL объекта уведомления.


### Инструкции по проверке бизнес-логики

1. Создайте уведомление, используя доступные шаблоны.
2. Проверьте, что подстановка параметров в шаблон происходит корректно:
  * Все введённые параметры отображаются в сообщении.
  * Параметры выделены жирным шрифтом.
3. Убедитесь, что уведомление успешно отправлено на email.
4. Убедитесь, что QR-код генерируется корректно и ссылается на URL объекта уведомления.
5. Проверьте, что ошибки корректно обрабатываются:
  * Отсутствие email или параметров вызывает сообщение об ошибке.
  * Ошибки API не нарушают работу приложения.

## Пример проверки
`Отправляемый на API объект: { message: "...", recipientEmail: "test@example.com", ... }
Ссылка на уведомление: https://cvb-production.up.railway.app/api/reminder/1
Сгенерированный QR-код URL: data:image/png;base64,...
Уведомление успешно отправлено!
QR-код успешно сгенерирован!
`

## Дальнейшее улучшение
* Добавление функциональности для управления шаблонами (создание, редактирование, удаление).
* Локализация для различных языков.
* Поддержка различных типов уведомлений (SMS, Push).
