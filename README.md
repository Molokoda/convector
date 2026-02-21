# Convector

Мобильное приложение для отслеживания курсов валют НБ РБ: курсы на дату, динамика курса (график), конвертер валют.

**Стек:** React Native, Expo, TypeScript, expo-router, Zustand, API НБ РБ.

## Требования

- Node.js 18+
- npm
- Для сборки под Android: Android Studio и настроенный эмулятор/устройство
- Для сборки под iOS: Xcode (только macOS)

## Установка

```bash
npm install
```

## Запуск

В проекте используется **expo-dev-client**, поэтому приложение запускается через **development build**, а не через приложение Expo Go из стора.

**Android (эмулятор или устройство):**

```bash
npm run android
```

**iOS (только на macOS, симулятор или устройство):**

```bash
npm run ios
```

Перед первым запуском убедитесь, что Metro bundler не занят. При необходимости сначала выполните `npm start` в отдельном терминале.

## Скрипты

| Команда           | Описание                    |
| ----------------- | --------------------------- |
| `npm start`       | Запуск Metro bundler и Expo |
| `npm run android` | Сборка и запуск на Android  |
| `npm run ios`     | Сборка и запуск на iOS      |
