import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import firebaseApp from '../auth/firebase'; // Import your Firebase configuration here
import style from './splitScreen.module.css'
import { getDatabase, ref, set } from '@firebase/database';

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

export default function SplitScreen() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const auth = getAuth(firebaseApp);
  const db = getDatabase(firebaseApp);

  const handleSignIn = async () => {
    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User signed in:', user);


    } catch (error:any) {
      console.error('Error signing in:', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      console.log(email, password, confirmPassword)

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User signed up:', user);

      if(user){
        const userRef = ref(db, 'users/' + user.uid);

        const userData = {
          email: user.email,
        };
      
        set(userRef, userData)
          .then(() => {
            console.log('User data saved to Realtime Database');
          })
          .catch((error:any) => {
            console.error('Error saving user data:', error);
          });
      }
    } catch (error:any) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>
            {isSignIn ? 'Sign in to your account' : 'Sign up for a new account'}
          </Heading>
          <form>
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
            <Button
              bg={'brand.100'}
              color={'white'}
              variant={'solid'}
              _hover={{ bg: 'brand.200' }}
              onClick={isSignIn ? handleSignIn : handleSignUp}
            >
              {isSignIn ? 'Sign in' : 'Sign up'}
            </Button>
          </Stack>
          </form>
        </Stack>
      </Flex>
      
      <Flex flex={1}>
        <div className={style.backContainer}>
          <div className={style.splashOne}></div>
          <div className={style.splashTwo}></div>
          <div className={style.imageContainer}>
            <Image
              alt={'Login Image'}
              objectFit={'cover'}
              src={'/happywoman.png'}
            />
          </div>
        </div>
      </Flex>
    </Stack>
  );
}
