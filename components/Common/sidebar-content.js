import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCompass, FiHome } from "react-icons/fi";
import { NavItem } from "./nav-item";
import { useRouter } from "next/router";
import usePollState from "../../store/poll-state.store";

const LinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Explore", icon: FiCompass, href: "/explore" },
];

export const SidebarContent = ({ onClose, ...rest }) => {
  const router = useRouter();
  const { colorScheme } = usePollState();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Consen
          <Text as={"span"} color={colorScheme + ".500"}>
            says
          </Text>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          href={link.href}
          highlight={router.pathname === link.href}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
