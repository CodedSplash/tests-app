import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useTestStore } from '../store';

export const TestList = () => {
  const tests = useTestStore((state) => state.tests);
  const selectTest = useTestStore((state) => state.selectTest);
  const navigate = useNavigate();
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');

  const handleStartTest = (id: string) => {
    selectTest(id);
    navigate(`/test/${id}`, { viewTransition: true });
  };

  if (tests.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="gray.500">Нет загруженных тестов</Text>
        <Text fontSize="sm" mt={2}>Загрузите тест в формате JSON, чтобы начать</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch" width="100%">
      <Heading size="md" mb={2}>Доступные тесты</Heading>
      
      {tests.map((test) => (
        <Card 
          key={test.id} 
          borderWidth="1px" 
          borderColor={cardBorder}
          bg={cardBg}
          borderRadius="lg"
          overflow="hidden"
          transition="all 0.2s"
          _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
        >
          <CardHeader pb={0}>
            <Heading size="md">{test.title}</Heading>
          </CardHeader>
          
          <CardBody py={2}>
            <HStack>
              <Badge colorScheme="blue">{test.questions.length} вопросов</Badge>
            </HStack>
          </CardBody>
          
          <CardFooter pt={0} justifyContent="flex-end">
            <Button
              rightIcon={<ChevronRightIcon />}
              colorScheme="blue"
              variant="outline"
              size="sm"
              onClick={() => handleStartTest(test.id)}
            >
              Начать тест
            </Button>
          </CardFooter>
        </Card>
      ))}
    </VStack>
  );
};