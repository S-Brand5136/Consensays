import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import MainLayout from "../../components/Layouts/main-layout";
import Link from "next/link";
import { useState } from "react";
import {
  getCsrfToken,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import usePollState from "../../store/poll-state.store";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}

function Login({ csrfToken, providers }) {
  const { colorScheme } = usePollState();

  return (
    <MainLayout>
      <Stack
        color={useColorModeValue("initial", "white")}
        spacing={8}
        mx={"auto"}
        maxW={"35rem"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Log in
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Welcome Back✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={"full"}
        >
          {/*<Stack spacing={4}>*/}
          {/*  <FormControl id="email" isRequired>*/}
          {/*    <FormLabel>Email address</FormLabel>*/}
          {/*    <Input type="email" />*/}
          {/*  </FormControl>*/}
          {/*  <FormControl id="password" isRequired>*/}
          {/*    <FormLabel>Password</FormLabel>*/}
          {/*    <InputGroup>*/}
          {/*      <Input type={showPassword ? "text" : "password"} />*/}
          {/*      <InputRightElement h={"full"}>*/}
          {/*        <Button*/}
          {/*          variant={"ghost"}*/}
          {/*          fontSize={"xl"}*/}
          {/*          padding={0}*/}
          {/*          onClick={() =>*/}
          {/*            setShowPassword((showPassword) => !showPassword)*/}
          {/*          }*/}
          {/*        >*/}
          {/*          {showPassword ? <GrFormView /> : <GrFormViewHide />}*/}
          {/*        </Button>*/}
          {/*      </InputRightElement>*/}
          {/*    </InputGroup>*/}
          {/*  </FormControl>*/}
          {/*  <Stack spacing={10} pt={2}>*/}
          {/*    <Button*/}
          {/*      loadingText="Submitting"*/}
          {/*      size="lg"*/}
          {/*      bg={"blue.400"}*/}
          {/*      color={"white"}*/}
          {/*      _hover={{*/}
          {/*        bg: "blue.500",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      Log in*/}
          {/*    </Button>*/}
          {/*  </Stack>*/}
          {/*  */}
          {/*</Stack>*/}
          <Stack pt={6} w={"20rem"} height={"10rem"} justifyContent={"center"}>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  w={"full"}
                  key={provider.name}
                  colorScheme={colorScheme}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </Button>
              ))}
          </Stack>
        </Box>
      </Stack>
    </MainLayout>
  );
}

export default Login;
