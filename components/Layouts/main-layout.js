import { Flex } from "@chakra-ui/react";
import SidebarWithHeader from "../Common/sidebar-with-header";

const MainLayout = ({ backgroundURL, children }) => {
  return (
    <SidebarWithHeader>
      <Flex
        as={"main"}
        h={"100%"}
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
    </SidebarWithHeader>
  );
};

export default MainLayout;
