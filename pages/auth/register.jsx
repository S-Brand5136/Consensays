import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import MainLayout from "../../components/Layouts/main-layout";
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import Link from "next/link";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";

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

function Register({ csrfToken, providers }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MainLayout>
      <Stack
        color={useColorModeValue("initial", "white")}
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start tracking your poll stats✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    fontSize={"xl"}
                    padding={0}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <GrFormView /> : <GrFormViewHide />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link style={{ color: "teal" }} href={"/auth/login"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
          {providers &&
            Object.values(providers).map((provider) => (
              <Button
                mt={5}
                w={"full"}
                key={provider.name}
                colorScheme={"green"}
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </Button>
            ))}
        </Box>
      </Stack>
    </MainLayout>
  );
}

export default Register;
