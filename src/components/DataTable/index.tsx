import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  IconButton,
  Text,
  HStack,
  Input,
  Divider,
  Center,
  Select,
  TableCaption,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  PaginationState,
} from '@tanstack/react-table';
import {
  MdArrowBackIos,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdFastForward,
  MdFastRewind,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  pagination?: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  dataLength?: number;
};

export function DataTable<Data extends object>({
  data,
  columns,
  pagination,
  setPagination,
  dataLength = 0,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    ...(pagination && {
      pageCount: Math.ceil(dataLength / pagination.pageSize) ?? -1,
    }),
  });

  return (
    <>
      <Table>
        {pagination && (
          <TableCaption bg="rgba(0, 0, 0, 0.03)">
            <Flex align="center" justify="flex-end">
              <HStack>
                <IconButton
                  icon={<MdFastRewind />}
                  aria-label="return to start"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                />
                <IconButton
                  icon={<MdNavigateBefore />}
                  aria-label="return to back"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                />
                <IconButton
                  icon={<MdNavigateNext />}
                  aria-label="go to next"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                />
                <IconButton
                  icon={<MdFastForward />}
                  aria-label="go to last"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                />
              </HStack>
              <HStack>
                <Text>Página</Text>
                <Text as="b">
                  {table.getState().pagination.pageIndex + 1} de{' '}
                  {table.getPageCount()}
                </Text>
              </HStack>
              <Center height="20px" paddingX="6px">
                <Divider orientation="vertical" color="red" />
              </Center>
              <HStack>
                <Text>Ir para página:</Text>
                <Input
                  type="number"
                  maxW="50px"
                  min={1}
                  minW="50px"
                  w="100%"
                  size="sm"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                />
              </HStack>
              <Center height="20px" paddingX="6px">
                <Divider orientation="vertical" color="red" />
              </Center>
              <Select
                size="sm"
                minW="150px"
                maxW="200px"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Exibir {pageSize}
                  </option>
                ))}
              </Select>
            </Flex>
          </TableCaption>
        )}
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl="4">
                      {!['actions', 'phone'].includes(header.id) ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
