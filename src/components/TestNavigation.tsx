import {
  Button,
  HStack,
  Box,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@chakra-ui/icons';

interface TestNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  canNavigateNext: boolean;
  allQuestionsAnswered: boolean;
}

export const TestNavigation = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onFinish,
  canNavigateNext,
  allQuestionsAnswered,
}: TestNavigationProps) => {
  const buttonColorScheme = useColorModeValue('blue', 'blue');
  
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <Box width="100%" py={4}>
      <HStack justifyContent="space-between" width="100%">
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={onPrevious}
          isDisabled={isFirstQuestion}
          variant="outline"
          colorScheme={buttonColorScheme}
        >
          Предыдущий
        </Button>

        <HStack spacing={2}>
          {isLastQuestion ? (
            <Tooltip 
              label={!allQuestionsAnswered ? 'Ответьте на все вопросы, чтобы завершить тест' : ''}
              isDisabled={allQuestionsAnswered}
            >
              <Button
                rightIcon={<CheckIcon />}
                onClick={onFinish}
                colorScheme="green"
                isDisabled={!allQuestionsAnswered}
              >
                Завершить тест
              </Button>
            </Tooltip>
          ) : (
            <Button
              rightIcon={<ChevronRightIcon />}
              onClick={onNext}
              colorScheme={buttonColorScheme}
              isDisabled={!canNavigateNext}
            >
              Следующий
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};