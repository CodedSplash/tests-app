import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import type { Test } from '../types';

export const testSchema = z.object({
  title: z.string().min(1, 'Заголовок теста обязателен'),
  questions: z.array(
    z.object({
      question: z.string().min(1, 'Текст вопроса обязателен'),
      options: z.array(z.string().min(1, 'Вариант ответа не может быть пустым')).min(2, 'Должно быть минимум 2 варианта ответа'),
      answerIndex: z.number().int().min(0, 'Индекс ответа должен быть положительным числом'),
    })
    .refine(question => question.answerIndex < question.options.length, {
      message: 'Индекс правильного ответа не может быть больше количества вариантов ответа',
      path: ['answerIndex']
    })
  ).min(1, 'Тест должен содержать хотя бы один вопрос'),
});

export type TestData = z.infer<typeof testSchema>;

export const parseTestFile = async (file: File): Promise<Test> => {
  try {
    const text = await file.text();
    const json = JSON.parse(text);
    
    const result = testSchema.safeParse(json);
    
    if (!result.success) {
      const errorMessage = result.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
      throw new Error(`Ошибка валидации: \n${errorMessage}`);
    }
    
    return {
      ...result.data,
      id: uuidv4(),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
      throw new Error(`Ошибка валидации: \n${errorMessage}`);
    }
    if (error instanceof SyntaxError) {
      throw new Error('Некорректный формат JSON');
    }
    throw error;
  }
};

export const calculateGrade = (correctPercent: number): number => {
  if (correctPercent >= 90) return 5;
  if (correctPercent >= 75) return 4;
  if (correctPercent >= 60) return 3;
  if (correctPercent >= 40) return 2;
  return 1;
};