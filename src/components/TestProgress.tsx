import {
  Box,
  Flex,
  Progress,
  Text,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';

interface TestProgressProps {
  totalQuestions: number;
  answeredQuestions: number;
}

export const TestProgress = ({
  totalQuestions,
  answeredQuestions,
}: TestProgressProps) => {
  const progressBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <Box width="100%" mb={4}>
      <Flex justifyContent="space-between" mb={1}>
        <HStack spacing={1}>
          <Text fontSize="sm" color={textColor}>
            Прогресс:
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            {answeredQuestions} из {totalQuestions} вопросов
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="bold">
          {progressPercentage.toFixed(0)}%
        </Text>
      </Flex>
      <Progress
        value={progressPercentage}
        size="sm"
        colorScheme="blue"
        bg={progressBg}
        borderRadius="full"
      />
    </Box>
  );
};