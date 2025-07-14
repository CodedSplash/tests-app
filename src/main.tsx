import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/system'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import theme, { config as themeConfig } from './theme'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { TestPage } from './pages/TestPage'
import { ResultPage } from './pages/ResultPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/tests-app/" replace />} />
          <Route path="/tests-app/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="test/:testId" element={<TestPage />} />
            <Route path="result/:testId" element={<ResultPage />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  </StrictMode>,
)
