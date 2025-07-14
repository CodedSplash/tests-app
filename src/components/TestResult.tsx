import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Badge,
  Divider,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import type { Test, AnswerState } from '../types';
import { calculateGrade } from '../utils/validation';

interface TestResultProps {
  test: Test;
  answers: AnswerState;
}

export const TestResult = ({ test, answers }: TestResultProps) => {
  const correctAnswers = Object.entries(answers).filter(([index, answerIndex]) => {
    const questionIndex = parseInt(index);
    return test.questions[questionIndex].answerIndex === answerIndex;
  }).length;
  const totalQuestions = test.questions.length;
  const percentage = (correctAnswers / totalQuestions) * 100;
  const grade = calculateGrade(percentage);
  
  const resultBg = useColorModeValue('white', 'gray.700');
  const resultBorder = useColorModeValue('gray.200', 'gray.600');
  const accordionBg = useColorModeValue('gray.50', 'gray.800');
  
  const getGradeColor = () => {
    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'yellow';
    return 'red';
  };

  const getAnswerIcon = (isCorrect: boolean) => {
    return isCorrect ? (
      <CheckCircleIcon color="green.500" />
    ) : (
      <WarningIcon color="red.500" />
    );
  };

  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        borderColor={resultBorder}
        bg={resultBg}
        boxShadow="md"
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg" textAlign="center">
            Результаты теста
          </Heading>
          
          <Box textAlign="center" py={4}>
            <Heading as="h3" size="4xl" color={`${getGradeColor()}.500`}>
              {grade}
            </Heading>
            <Text fontSize="lg" mt={2}>
              {correctAnswers} из {totalQuestions} правильных ответов
            </Text>
          </Box>
          
          <Box>
            <HStack justifyContent="space-between" mb={2}>
              <Text fontWeight="bold">Процент выполнения:</Text>
              <Text fontWeight="bold">{percentage.toFixed(0)}%</Text>
            </HStack>
            <Progress
              value={percentage}
              colorScheme={getGradeColor()}
              size="lg"
              borderRadius="full"
            />
          </Box>
        </VStack>
      </Box>

      <Divider />
      
      <Heading as="h3" size="md">
        Детали ответов
      </Heading>
      
      <Accordion allowMultiple defaultIndex={[]}>
        {test.questions.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer !== undefined && userAnswer === question.answerIndex;
          
          return (
            <AccordionItem 
              key={index} 
              borderWidth="1px"
              borderRadius="md"
              borderColor={resultBorder}
              mb={3}
              overflow="hidden"
            >
              <h2>
                <AccordionButton bg={accordionBg} _hover={{ bg: accordionBg }}>
                  <Box flex="1" textAlign="left">
                    <HStack>
                      {getAnswerIcon(isCorrect)}
                      <Text fontWeight="medium" ml={2}>
                        Вопрос {index + 1}: {question.question.substring(0, 50)}
                        {question.question.length > 50 ? '...' : ''}
                      </Text>
                    </HStack>
                  </Box>
                  <Badge colorScheme={isCorrect ? 'green' : 'red'} mr={2}>
                    {isCorrect ? 'Верно' : 'Неверно'}
                  </Badge>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={3}>
                  <Text fontWeight="bold">{question.question}</Text>
                  
                  {question.options.map((option, optionIndex) => {
                    const isSelected = optionIndex === userAnswer;
                    const isCorrectAnswer = optionIndex === question.answerIndex;
                    
                    let bgColor = 'transparent';
                    if (isCorrectAnswer) {
                      bgColor = useColorModeValue('green.50', 'green.900');
                    } else if (isSelected && !isCorrect) {
                      bgColor = useColorModeValue('red.50', 'red.900');
                    }
                    
                    return (
                      <Box
                        key={optionIndex}
                        p={3}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={resultBorder}
                        bg={bgColor}
                      >
                        <HStack>
                          {isSelected && (
                            <Badge colorScheme={isCorrect ? 'green' : 'red'} mr={2}>
                              Ваш ответ
                            </Badge>
                          )}
                          {isCorrectAnswer && !isSelected && (
                            <Badge colorScheme="green" mr={2}>
                              Правильный ответ
                            </Badge>
                          )}
                          <Text>{option}</Text>
                        </HStack>
                      </Box>
                    );
                  })}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </VStack>
  );
};