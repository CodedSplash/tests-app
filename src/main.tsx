import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/system'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import theme, { config as themeConfig } from './theme'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { TestPage } from './pages/TestPage'
import { ResultPage } from './pages/ResultPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'test/:testId',
        element: <TestPage />,
      },
      {
        path: 'result/:testId',
        element: <ResultPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)
