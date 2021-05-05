import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import {
  FormHelperText,
  FormControl,
  FormLabel,
  Button,
  Input,
  Container,
  Box,
  Text,
  LightMode,
  Flex,
  useToast,
  Spacer
} from '@chakra-ui/react';

// import Footer from '../components/Footer';
// import { useAuth } from '../useAuth';

const LogIn = () => {
  // const auth = useAuth();

  // this sets the current state using the useState hook;
  const [currentUser, setCurrentUserField] = useState({
    username: '',
    password: '',
  });
  // this sets the toast parts according to errors/actions
  const [toastMessage, setToastMessage] = useState(undefined);

  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (toastMessage) {
      toast({
        title: toastMessage.title,
        description: toastMessage.description,
        status: 'warning',
        duration: toastMessage.duration,
        isClosable: true,
        position: 'top',
      });
    }
  }, [toastMessage, toast]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCurrentUserField({ ...currentUser, [name]: value });
    // console.log(event.target.value);
  };
  // backend function passed down in props that will take the currentUser as input;

  const handleUserSubmit = (event) => {
    event.preventDefault();
    let title;
    let description;
    let duration;

    fetch('/member/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return res.json().then((data) => {
          throw data;
        });
      })
      // .then((data) => {
      //   auth.signInFunc(data.user.id, data.user.username, () =>
      //     history.replace('/time/home')
      //   );
      // })
      .catch((error) => {
        title = 'error';
        description = `${error.err}`;
        duration = 9000;
        // n;
        setToastMessage({ title, description, duration });
      });
  };

  return (
    <>
      <LightMode>
        <Flex justifyContent="center" h='100vh' backgroundImage='url(https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg)'>
          <Box>
            {/* <Box
              mb="20px"
              width="100%"
              overflow="hidden"
              border="1px"
              borderColor="cyan.400"
              background="cyan.300"
            >
              <Text textAlign="center" letterSpacing="2px" mb={2}>
                Curio
          </Text>
            </Box> */}
            <Container
              border="3px solid black"
              margin='auto'
              mt="100px"
              mb="100px"
              maxW="300px"
              py="20px"
              rounded="5%"
              bg='whitesmoke'
            >
              <Container marginBottom="1px solid silver" justifyContent="column">
                <form onSubmit={handleUserSubmit}>
                  <FormControl isRequired>
                    <FormLabel>Email:</FormLabel>
                    <Input
                      id="username"
                      onChange={handleInputChange}
                      name="username"
                      borderColor='black'
                      color='black'
                    />
                    <FormHelperText fontSize="12px" id="email-helper-text">
                      Your email
                </FormHelperText>
                  </FormControl>
                  <FormControl isRequired mt="10px">
                    <FormLabel>Password:</FormLabel>
                    <Input
                      id="password"
                      onChange={handleInputChange}
                      type="password"
                      name="password"
                      borderColor='black'
                      color='black'
                    />
                    <FormHelperText fontSize="12px" id="password-helper-text">
                      The password you used to signup with
                </FormHelperText>
                  </FormControl>
                  <Button
                    ml="80px"
                    mt={4}
                    colorScheme="cyan"
                    color="white"
                    type="submit"
                  >
                    Log In
              </Button>
                </form>
              </Container>
              {/* <Flex mt="30px" justifyContent="space-between">
            <Button colorScheme="teal" mb="10px" mr="10px"><Text fontSize="12px">Login with Facebook</Text></Button>
            <Button colorScheme="purple"><Text fontSize="12px">Login with Google</Text></Button>
          </Flex> */}
              <Container>
                <Flex justifyContent="space-evenly" padding={3}>
                  <Text fontSize="12px">Don't have an account?</Text>
                  <NavLink to="/signup">
                    <Text fontSize="12px" textDecoration="underline">
                      Sign Up
                    </Text>
                  </NavLink>
                </Flex>
                {/* <NavLink to="/resetPassword"><Text id="forgotPassword" ml="30px" pt="5px" fontSize="10px">Forgot username and password?</Text></NavLink> */}
              </Container>
            </Container>
          </Box>
          {/* <Footer mt={3} /> */}
        </Flex>
      </LightMode>
    </>
  );
};
export default LogIn;
