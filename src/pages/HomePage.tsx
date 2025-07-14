import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FileUpload } from '../components/FileUpload';
import { TestList } from '../components/TestList';

export const HomePage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Приложение для тестирования
          </Heading>
          <Text color="gray.500">
            Загрузите JSON-файл с тестом и начните проверку знаний
          </Text>
        </Box>

        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading as="h2" size="md" mb={4}>
            Загрузить новый тест
          </Heading>
          <FileUpload />
        </Box>

        <Divider />

        <Box>
          <TestList />
        </Box>
      </VStack>
    </Container>
  );
};
