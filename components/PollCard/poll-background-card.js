import {
  Box,
  Button,
  Divider,
  SimpleGrid,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { MdOutlineWallpaper } from "react-icons/md";
import { backgrounds } from "../../constants/backgrounds";

const PollBackgroundCard = ({ setBackground }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button variant={"iconLeft"} onClick={onToggle}>
        <MdOutlineWallpaper />
        Background
      </Button>
      <Divider borderWidth={"1px"} />
      <Slide
        direction={"right"}
        in={isOpen}
        style={{ zIndex: 10 }}
        onClick={onToggle}
      >
        <SimpleGrid
          position={"absolute"}
          right={0}
          top={"25%"}
          bottom={"25%"}
          left={0}
          marginLeft={"auto"}
          marginRight={"auto"}
          width={"20rem"}
          h={"20rem"}
          overflowY={"scroll"}
          p="40px"
          bg="white"
          rounded="md"
          boxShadow={"1px 2px 5px gray"}
          columns={2}
          gap={5}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Box
            background={"#F8F8F8"}
            _hover={{
              background: "#F8F8F8",
              cursor: "pointer",
              boxShadow: "1px 1px 2px #d9d9d9 inset",
            }}
            onClick={() => setBackground(null)}
            padding={2}
          >
            <Image src="" alt={""} width={100} height={50} />
          </Box>
          {backgrounds.map((item, id) => (
            <Box
              onClick={() => setBackground(item.path)}
              _hover={{
                background: "#F8F8F8",
                cursor: "pointer",
                boxShadow: "1px 1px 2px #d9d9d9 inset",
              }}
              padding={2}
              key={id}
            >
              <Image
                key={id}
                width={100}
                height={50}
                src={item.path}
                alt={item.title}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Slide>
    </>
  );
};

export default PollBackgroundCard;