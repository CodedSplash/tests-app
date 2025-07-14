import { Button, useColorMode, Tooltip } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Tooltip 
      label={`Переключить на ${colorMode === 'light' ? 'темную' : 'светлую'} тему`}
      placement="bottom"
      hasArrow
    >
      <Button
        onClick={toggleColorMode}
        size="md"
        variant="ghost"
        aria-label={`Переключить на ${colorMode === 'light' ? 'темную' : 'светлую'} тему`}
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Tooltip>
  );
};