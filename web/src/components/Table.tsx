import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import Card from "./Card";

interface IDefaultTable {
  children: ReactNode;
  props: {
    tableName: string;
    header: string[];
    count: number;
  };
}

const DefaultTable = ({ children, props }: IDefaultTable) => {
  return (
    <Card props={{ title: props.tableName }}>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              {props.count > 0 ? (
                <>
                  <Th w={1}>#</Th>
                  {props.header.map((header, index) => (
                    <Th key={index}>{header}</Th>
                  ))}
                  <Th w={10}>Ações</Th>
                </>
              ) : (
                <Th></Th>
              )}
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
          <Tfoot>
            <Tr>
              {props.count > 0 ? (
                <>
                  <Th w={1}>#</Th>
                  {props.header.map((header, index) => (
                    <Th key={index}>{header}</Th>
                  ))}
                  <Th w={10}>Ações</Th>
                </>
              ) : (
                <Th></Th>
              )}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DefaultTable;
