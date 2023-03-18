import {Flex} from "@chakra-ui/react";

export const OptionsList = (props) => {
  return <Flex
    w={"100%"}
    as={"section"}
    flexDir={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    gap={3}
    id={"options-container"}
  >
    {props.options.map(props.callbackfn)}
  </Flex>;
}