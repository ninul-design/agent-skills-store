# prompt-tester-v1

## Metadata
- **name**: prompt-tester-v1
- **description**: Автоматизированное тестирование и оценка качества AI-промптов с сохранением результатов в Supabase
- **version**: 1.0.0
- **author**: MiniMax Agent

## Overview
Навык для систематического тестирования и оценки качества AI-промптов. Использует многофакторную систему оценки для анализа ответов модели.

## Features
- Многофакторная оценка промптов (Relevance, Accuracy, Completeness)
- Интеграция с Supabase для хранения результатов
- Настраиваемая конфигурация критериев
- JSON-отчёт с детальным разбором

## Usage
```bash
python scripts/test_runner.py --prompt "Your prompt here" --input "Test input"
```

## Configuration
Настройки в `scripts/config.yaml`:
- Модель для тестирования
- Весовые коэффициенты оценки
- Пороговые значения

## Score Calculation
```
итоговый_score = (Relevance × 0.4) + (Accuracy × 0.3) + (Completeness × 0.3)
```

## Score Ranges
| Диапазон | Балл | Описание |
|----------|------|----------|
| 0–30 | FAIL | Ответ непригоден |
| 31–60 | MARGINAL | Требует доработки |
| 61–80 | ACCEPTABLE | Хороший ответ |
| 81–100 | EXCELLENT | Отличный ответ |
