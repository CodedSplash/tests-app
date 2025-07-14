import { create } from 'zustand';
import { persist, type PersistOptions } from 'zustand/middleware';
import type { Test, AnswerState } from '../types';

type TestStore = {
  tests: Test[];
  currentTest: Test | null;
  answers: AnswerState;
  addTest: (test: Test) => void;
  selectTest: (id: string) => void;
  submitAnswer: (qIndex: number, answerIndex: number) => void;
  reset: () => void;
};

type TestPersist = (
  config: StateCreator<TestStore>,
  options: PersistOptions<TestStore>
) => StateCreator<TestStore>;

type StateCreator<T> = (set: (state: Partial<T> | ((state: T) => Partial<T>)) => void, get: () => T, api: any) => T;

export const useTestStore = create<TestStore>(
  (persist as TestPersist)(
    (set, get) => ({
      tests: [],
      currentTest: null,
      answers: {},

      addTest: (test: Test) => {
        set((state) => ({
          tests: [...state.tests, test],
        }));
      },

      selectTest: (id: string) => {
        const test = get().tests.find((t) => t.id === id) || null;
        set({
          currentTest: test,
          answers: {},
        });
      },

      submitAnswer: (qIndex: number, answerIndex: number) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [qIndex]: answerIndex,
          },
        }));
      },

      reset: () => {
        set({
          answers: {},
        });
      },
    }),
    {
      name: 'test-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            tests: persistedState.tests || [],
            currentTest: null,
            answers: {},
            addTest: () => {},
            selectTest: () => {},
            submitAnswer: () => {},
            reset: () => {}
          } as TestStore;
        }
        return persistedState as TestStore;
      },
      partialize: (state: TestStore) => ({
        tests: state.tests,
        currentTest: null,
        answers: {},
        addTest: state.addTest,
        selectTest: state.selectTest,
        submitAnswer: state.submitAnswer,
        reset: state.reset
      }),
    }
  )
);