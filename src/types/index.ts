export type Question = {
  question: string;
  options: string[];
  answerIndex: number;
};

export type Test = {
  id: string;
  title: string;
  questions: Question[];
};

export type AnswerState = {
  [questionIndex: number]: number;
};