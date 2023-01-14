import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

const AccordionLayout = ({ children, title }) => {
  return (
    <Accordion allowToggle>
      <AccordionItem
        _after={{ borderStyle: "hidden" }}
        _before={{ borderStyle: "hidden" }}
        borderStyle={"hidden"}
      >
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                _hover={{ opacity: 1 }}
                opacity={!isExpanded ? "0.5" : 1}
                padding={0}
                fontWeight={"semibold"}
              >
                {isExpanded ? (
                  <IoMdArrowDropdown fontSize='1.25em' />
                ) : (
                  <IoMdArrowDropright fontSize='1.25em' />
                )}
                <Box
                  as='span'
                  marginLeft={3}
                  fontSize={"1.1em"}
                  flex='1'
                  textAlign='left'
                >
                  {title}
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel padding={0}>{children}</AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionLayout;
