import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FiChevronDown, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import usePollState from "../../store/poll-state.store";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const MobileNav = ({ onOpen, ...rest }) => {
  const { colorScheme } = usePollState();
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color={useColorModeValue("initial", "white")}
      >
        Consen
        <Text as={"span"} color={colorScheme + ".500"}>
          says
        </Text>
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <FiSun /> : <FiMoon />}
        />
        <Flex
          alignItems={"center"}
          color={useColorModeValue("initial", "white")}
        >
          {!session ? (
            <>
              <Link style={{ marginRight: "1rem" }} href={"/auth/login"}>
                Login
              </Link>
              {/*<Link href={"/auth/register"}>Register</Link>*/}
            </>
          ) : (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} src={session.user.image} />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                    color={useColorModeValue("initial", "white")}
                  >
                    <Text fontSize="sm">{session.user.name}</Text>
                    {/*<Text*/}
                    {/*  fontSize="xs"*/}
                    {/*  color={useColorModeValue("gray.600", "gray.300")}*/}
                    {/*>*/}
                    {/*  Admin*/}
                    {/*</Text>*/}
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList color={useColorModeValue("initial", "gray.200")}>
                <Link href={"/profile"}>
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};
