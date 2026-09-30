# English Sounds Teacher (Web / Node + TypeScript)

> **Interactive ear-training simulator for mastering the 44 sounds of the English language.**
> Built with **Node.js, TypeScript, React, and Vite**. Designed to run entirely in the browser as static files deployed to **GitHub Pages**.

[English Description](#english) | [Русское описание](#russian)

---

<a name="english"></a>
## English

### Overview

**English Sounds Teacher** is an interactive ear-training web application designed to help English learners recognize, distinguish, and master the 44 phonemes of the English language (12 monophthongs, 8 diphthongs, and 24 consonants).

In this simulator, you listen to sounds spoken by native English speakers, identify their phonemic representations, and click the corresponding cards on the screen in the correct sequence.

### Key Features

- **Runs 100% in the Browser**: Completely static application. No backend server or database required.
- **Ready for GitHub Pages**: Relative asset paths (`base: './'`) and automated GitHub Actions workflow included.
- **4 Real Voice Sets**:
  - 🎵 *Chart Voice* (Standard phonemic chart pronunciation)
  - 👨 *Alex* (Male speaker)
  - 👩 *Female 1*
  - 👩 *Female 2*
  - 🔀 *Random Mix* (Picks randomly each round, true to the original Python version)
- **44 Articulation Diagrams & Mouth Anatomy Map**: Inspect tongue positions, lip shapes, and vocal tract movements for every sound.
- **Multiple Game Modes**:
  - **Quiz Mode** (Default 12 progressive groups, threshold 10)
  - **Training Mode** (Intensive minimal-pairs practice, threshold 30)
  - **Minimal Pairs Mode** (Focused pairs like /iː/ vs /ɪ/, /θ/ vs /ð/, etc.)
  - **Full Chart Challenge** (12 pure vowels, 8 diphthongs, 24 consonants)
  - **Custom Practice** (Pick any subset of sounds to practice)
- **Non-Overlapping Scattered Canvas & Clean Grid**: Choose between the classic scattered hunting field or a clean responsive grid.
- **Progress Persistence**: Automatically saves your current level, streak, and statistics to `localStorage`.
- **Keyboard Shortcuts**:
  - <kbd>Space</kbd> or <kbd>R</kbd>: Replay current sound sequence
  - <kbd>Esc</kbd>: Open / Close Settings
  - <kbd>F</kbd>: Toggle Fullscreen
  - <kbd>M</kbd>: Mute / Unmute

### Getting Started Locally

#### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

#### Installation & Development
```bash
# Install dependencies
npm install

# Start local development server with hot-reload
npm run dev

# Build production static bundle
npm run build

# Preview production build locally
npm run preview
```

### GitHub Pages Deployment

The repository includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`).

To deploy:
1. Push your changes to the `main` branch.
2. Go to **Settings > Pages** in your GitHub repository.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. GitHub Actions will automatically build and publish your site!

---

<a name="russian"></a>
## Russian (Русский)

### Описание программы

**English Sounds Teacher** — веб-тренажер для освоения звуков английского языка на слух. Программа переписана с Python/Pygame на современный стек **Node.js + TypeScript + React + Vite** для работы исключительно в браузере в виде статических файлов (GitHub Pages).

Вы слушаете звуки, узнаете их и кликаете по карточкам на экране в правильном порядке. По мере успешных угадываний сложность возрастает (увеличивается количество звуков в цепочке и открываются новые группы).

### Основные возможности

- **Работает полностью в браузере**: Никаких серверов или установок Python. Достаточно открыть ссылку на GitHub Pages.
- **4 набора голосов**: Chart, Алекс (мужской голос), Female 1, Female 2, а также режим случайного чередования.
- **Интерактивные карты артикуляции**: Для каждого из 44 звуков доступна схема положения языка, губ и гортани, а также общая анатомическая карта рта.
- **Режимы обучения**:
  - **Режим квиза (Quiz Mode)**: 12 сбалансированных групп звуков.
  - **Режим тренировки (Training Mode)**: Усиленная тренировка на минимальных парах (порог угадываний 30).
  - **Минимальные пары (Minimal Pairs)**: Точечная отработка схожих звуков (/iː/ и /ɪ/, /s/ и /z/, /w/ и /v/ и др.).
  - **Полная таблица (Full Chart)**: Монофтонги, дифтонги, согласные.
  - **Пользовательский режим**: Выбор любых конкретных звуков для отработки.
- **Два вида раскладки**:
  - *Хаотичный холст (Scattered Canvas)* — в стиле оригинальной Pygame версии, но с умным алгоритмом против перекрытия карточек.
  - *Четкая сетка (Clean Grid)* — для удобной игры на смартфонах и планшетах.
- **Сохранение прогресса**: Сохраняется в `localStorage` браузера (кнопка сброса возвращает к началу, как удаление `progress.ini`).
- **Горячие клавиши**:
  - `Space` или `R`: Повторить звучание
  - `Esc`: Настройки
  - `F`: Полный экран

### Запуск и сборка

```bash
# Установка зависимостей
npm install

# Запуск локального сервера разработки
npm run dev

# Сборка статических файлов для GitHub Pages
npm run build

# Локальный предпросмотр сборки
npm run preview
```
