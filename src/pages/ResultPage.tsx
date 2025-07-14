import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';
import { useTestStore } from '../store';
import { TestResult } from '../components/TestResult';

export const ResultPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const tests = useTestStore((state) => state.tests);
  const currentTest = useTestStore((state) => state.currentTest);
  const answers = useTestStore((state) => state.answers);
  const selectTest = useTestStore((state) => state.selectTest);
  const reset = useTestStore((state) => state.reset);

  useEffect(() => {
    if (!testId) {
      navigate('/', { viewTransition: true });
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
        navigate('/', { viewTransition: true });
      }
    }
  }, [testId, currentTest, tests, selectTest, navigate, toast]);

  if (!currentTest) {
    return null;
  }

  const answeredQuestionsCount = Object.keys(answers).length;
  const allQuestionsAnswered = answeredQuestionsCount === currentTest.questions.length;

  useEffect(() => {
    if (!allQuestionsAnswered) {
      navigate(`/test/${testId}`, { viewTransition: true });
    }
  }, [testId, navigate])

  const handleRetakeTest = () => {
    reset();
    navigate(`/test/${testId}`, { viewTransition: true });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => navigate('/', { viewTransition: true })}
            mb={4}
          >
            Вернуться на главную
          </Button>
          
          <Heading as="h1" size="lg" mb={2}>
            {currentTest.title}
          </Heading>
          
          <Text color="gray.500" mb={4}>
            Вы завершили тест. Ниже представлены ваши результаты.
          </Text>
        </Box>

        <TestResult test={currentTest} answers={answers} />

        <Divider />

        <Box textAlign="center" py={4}>
          <Button
            leftIcon={<RepeatIcon />}
            colorScheme="blue"
            onClick={handleRetakeTest}
            size="lg"
          >
            Пройти тест заново
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};
