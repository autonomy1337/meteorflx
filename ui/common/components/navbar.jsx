import React from 'react';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Logout } from './logout';

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
        justify="space-between"
      >
        <Flex align="center">
          <img src="./logo_transparent.png" alt="Logo" style={{ height: '60px', marginRight: '50px' }} />
        </Flex>

        <Flex flex={1} justify="center" align="center" position="relative">
          <Text
            as="span"
            bgGradient="linear(to-l, #ae56a2, #b7410e)"
            bgClip="text"
            fontWeight="bold"
            fontFamily="heading"
            textAlign="center"
            position="absolute"
          >
            Simple Task by Felix Raab
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Logout />
        </Stack>
      </Flex>
    </Box>
  );
}
