import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  HStack,
  Badge,
} from '@chakra-ui/react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answerId: string) => void;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor={cardBorder}
      bg={cardBg}
      p={6}
      width="100%"
      boxShadow="sm"
    >
      <VStack align="stretch" spacing={6}>
        <HStack justifyContent="space-between" alignItems="center">
          <Badge colorScheme="blue" fontSize="sm">
            Вопрос {questionNumber} из {totalQuestions}
          </Badge>
        </HStack>

        <Box>
          <Heading as="h3" size="md" mb={2}>
            {question.question}
          </Heading>
        </Box>

        <RadioGroup
          onChange={onAnswerSelect}
          value={selectedAnswer || ''}
        >
          <Stack direction="column" spacing={3}>
            {question.options.map((option, index) => (
              <Box
                key={index}
                p={3}
                borderWidth="1px"
                borderRadius="md"
                borderColor={cardBorder}
                bg={'transparent'}
              >
                <Radio value={String(index)} width="100%">
                  <Text>{option}</Text>
                </Radio>
              </Box>
            ))}
          </Stack>
        </RadioGroup>
      </VStack>
    </Box>
  );
};