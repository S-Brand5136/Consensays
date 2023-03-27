import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Moment from "react-moment";

const PollsTable = ({ polls }) => {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {polls.map((poll) => (
            <Tr key={poll.id} color={useColorModeValue("initial", "white")}>
              <Td>{poll.title}</Td>
              <Td>
                <Moment format="YY/MM/DD">{poll.startDate}</Moment>
              </Td>
              <Td>
                {" "}
                <Moment format="YY/MM/DD">{poll.endDate}</Moment>
              </Td>
              <Td>
                <Link href={"/polls/" + poll.id}>View</Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PollsTable;
