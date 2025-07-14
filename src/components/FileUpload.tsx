import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { parseTestFile } from '../utils/validation';
import { useTestStore } from '../store';

export const FileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const toast = useToast();
  const addTest = useTestStore((state) => state.addTest);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.elements.namedItem('file') as HTMLInputElement;
    
    if (!fileInput.files || fileInput.files.length === 0) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите файл',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const file = fileInput.files[0];
    setIsLoading(true);

    try {
      const test = await parseTestFile(file);
      addTest(test);
      
      toast({
        title: 'Успех',
        description: `Тест "${test.title}" успешно загружен`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setFileName('');
      fileInput.value = '';
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Неизвестная ошибка',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel htmlFor="file">Загрузить тест (JSON)</FormLabel>
          <Input
            type="file"
            id="file"
            name="file"
            accept=".json"
            onChange={handleFileChange}
            padding={1}
            height="auto"
          />
        </FormControl>
        
        {fileName && (
          <Text fontSize="sm" color="gray.500">
            Выбран файл: {fileName}
          </Text>
        )}
        
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isLoading}
          leftIcon={<AttachmentIcon />}
          isDisabled={!fileName}
        >
          Загрузить тест
        </Button>
      </VStack>
    </Box>
  );
};