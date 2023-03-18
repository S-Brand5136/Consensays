import {Flex} from "@chakra-ui/react";

const MainLayout = ({backgroundURL, children}) => {
  return (
    <Flex
      as={"main"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      gap={5}
      background={`url(${backgroundURL})`}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"center"}
    >
      {children}
    </Flex>
  );
};

export default MainLayout;