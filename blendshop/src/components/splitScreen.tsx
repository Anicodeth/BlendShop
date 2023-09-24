import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
} from '@chakra-ui/react';

import { useState } from 'react';
import style from './splitScreen.module.css'


export default function SplitScreen() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>
            {isSignIn ? 'Sign in to your account' : 'Sign up for a new account'}
          </Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          {!isSignIn && (
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" />
            </FormControl>
          )}
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'} onClick={toggleForm}>
                {isSignIn ? 'Sign up instead' : 'Sign in instead'}
              </Link>
            </Stack>
            <Button bg={'brand.100'} 
            color = {'white'}
            variant={'solid'}
            _hover={{ bg: 'brand.200' } }
            >
              {isSignIn ? 'Sign in' : 'Sign up'}
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <div className = {style.backContainer}>
          <div className = {style.splashOne}></div>
          <div className = {style.splashTwo}></div>
        <div className = {style.imageContainer}>


            <Image
              alt={'Login Image'}
              objectFit={'cover'}
              src={
                '/happywoman.png'
              }
            />
      </div>
      </div>
      </Flex>
    </Stack>
  );
}
