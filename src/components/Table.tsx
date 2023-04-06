import { Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Table } from '@chakra-ui/react';
import { dataSum } from '../utils/date-utils/calculation';

interface DataPropsType {
  data: { [date: string]: number };
  weeks: number;
  days: number;
}

function DataTable({ data, weeks, days }: DataPropsType) {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>날짜</Th>
            <Th isNumeric>글 개수</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(data).map(([dateKey, countValue]: [string, number]) => (
            <Tr key={`date-${dateKey}`}>
              <Td>{dateKey}</Td>
              <Td isNumeric>{countValue}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>합계</Th>
            <Th isNumeric>{data && dataSum(data)}</Th>
          </Tr>
          <Tr>
            <Th>일 평균</Th>
            <Th isNumeric>{days && (dataSum(data) / days).toFixed(2)}</Th>
          </Tr>
          <Tr>
            <Th>주 평균</Th>
            <Th isNumeric>{weeks && (dataSum(data) / weeks).toFixed(2)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
export default DataTable;
