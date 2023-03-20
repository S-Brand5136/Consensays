import { Flex, Icon } from "@chakra-ui/react";
import usePollState from "../../store/poll-state.store";
import Link from "next/link";

export const NavItem = ({ icon, children, highlight, href, ...rest }) => {
  const { colorScheme } = usePollState();

  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={highlight && `${colorScheme}.500`}
        color={highlight && "white"}
        _hover={{
          bg: `${colorScheme}.500`,
          color: "white",
          opacity: 0.5,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
