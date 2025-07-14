import {
  Box,
  Container,
  Flex,
  Heading,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Layout = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box
        as="header"
        py={4}
        px={[4, 6, 8]}
        borderBottom="1px"
        borderColor={borderColor}
        bg={bgColor}
        position="sticky"
        top={0}
        zIndex={10}
        boxShadow="sm"
      >
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Link as={RouterLink} to="/tests-app" viewTransition={true} _hover={{ textDecoration: 'none' }}>
              <Heading size="md">Приложение для тестирования</Heading>
            </Link>
            <ThemeToggle />
          </Flex>
        </Container>
      </Box>

      <Box as="main" flex="1" py={6}>
        <Outlet />
      </Box>

      <Box
        as="footer"
        py={4}
        borderTop="1px"
        borderColor={borderColor}
        bg={bgColor}
        textAlign="center"
      >
        <Container maxW="container.lg">
          <Box fontSize="sm" color="gray.500">
            © {new Date().getFullYear()} Приложение для тестирования
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
