import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  VStack,
  useToast,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useTestStore } from '../store';
import { QuestionCard } from '../components/QuestionCard';
import { TestNavigation } from '../components/TestNavigation';
import { TestProgress } from '../components/TestProgress';

export const TestPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const tests = useTestStore((state) => state.tests);
  const currentTest = useTestStore((state) => state.currentTest);
  const answers = useTestStore((state) => state.answers);
  const selectTest = useTestStore((state) => state.selectTest);
  const submitAnswer = useTestStore((state) => state.submitAnswer);
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    if (!testId) {
      navigate('/tests-app/', { viewTransition: true });
      return;
    }

    if (!currentTest || currentTest.id !== testId) {
      const test = tests.find((t) => t.id === testId);
      if (test) {
        selectTest(testId);
      } else {
        toast({
          title: 'Ошибка',
          description: 'Тест не найден',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        navigate('/tests-app/', { viewTransition: true });
      }
    }
  }, [testId, currentTest, tests, selectTest, navigate, toast]);

  if (!currentTest) {
    return null;
  }

  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  const answeredQuestionsCount = Object.keys(answers).length;
  const allQuestionsAnswered = answeredQuestionsCount === currentTest.questions.length;
  
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(currentAnswer !== undefined);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    currentAnswer !== undefined ? String(currentAnswer) : null
  );

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setIsQuestionAnswered(true);

    if(currentQuestionIndex === (currentTest.questions.length - 1)) {
      submitAnswer(currentQuestionIndex, parseInt(answerId));
    }
  };

  useEffect(() => {
    setSelectedAnswer(currentAnswer !== undefined ? String(currentAnswer) : null);
    setIsQuestionAnswered(currentAnswer !== undefined);
  }, [currentQuestionIndex, currentAnswer]);

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      submitAnswer(currentQuestionIndex, parseInt(selectedAnswer));
      
      if (currentQuestionIndex < currentTest.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsQuestionAnswered(false);
      }
    }
  };

  const handleFinishTest = () => {
    if (allQuestionsAnswered) {
      navigate(`/tests-app/result/${currentTest.id}`, { viewTransition: true });
    } else {
      toast({
        title: 'Внимание',
        description: 'Пожалуйста, ответьте на все вопросы перед завершением теста',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => navigate('/tests-app/', { viewTransition: true })}
            mb={4}
          >
            Вернуться на главную
          </Button>
          
          <Heading as="h1" size="lg" mb={2}>
            {currentTest.title}
          </Heading>
          
          <TestProgress
            totalQuestions={currentTest.questions.length}
            answeredQuestions={answeredQuestionsCount}
          />
        </Box>

        <Box
          bg={bgColor}
          borderRadius="lg"
          p={6}
        >
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentTest.questions.length}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
        </Box>

        <TestNavigation
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={currentTest.questions.length}
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
          onFinish={handleFinishTest}
          canNavigateNext={isQuestionAnswered && selectedAnswer !== null}
          allQuestionsAnswered={allQuestionsAnswered}
        />
      </VStack>
    </Container>
  );
};
