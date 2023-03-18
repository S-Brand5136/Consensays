import {Button, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {AiOutlineClose} from "react-icons/ai";

export const OptionListItem = (props) => {
  return <InputGroup>
    <Input
      placeholder={"Option " + (props.index + 1)}
      type={"text"}
      id={"option" + props.id}
      value={props.value}
      onChange={props.onChange}
      _focus={{borderColor: props.borderColor, outline: "none"}}
      _focusVisible={{boxShadow: `0 0 0 1px ${props.borderColor}`}}
      variant={"outline"}
    />
    {props.options.length > 2 && (
      <InputRightElement>
        <Button
          padding={0}
          background={"transparent"}
          _hover={{background: "transparent", color: "red", border: 'solid', borderColor: 'red', borderWidth: '1px'}}
          _active={{background: "transparent", opacity: 0.5,}}
          onClick={props.onClick}
        >
          <AiOutlineClose/>
        </Button>
      </InputRightElement>
    )}
  </InputGroup>;
}