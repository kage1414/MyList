import { Item } from "./TableSelection.container";

import { Table, Checkbox, ScrollArea, Group, Text, rem } from "@mantine/core";
import { useStyles } from "./styles";
import { DeleteRow } from "./DeleteRow";

type Props = {
  items: Item[];
  username: string;
  fetchData: () => void;
  onToggleAll: React.ChangeEventHandler<HTMLInputElement>;
  onToggleRow: (
    item: Item,
    complete?: boolean,
    shouldRefetch?: boolean
  ) => void;
};

export const TableSelection = ({
  items,
  username,
  fetchData,
  onToggleAll,
  onToggleRow,
}: Props) => {
  const { classes, cx } = useStyles();

  const rows = items.map((item) => {
    return (
      <tr
        key={JSON.stringify(item)}
        className={cx({ [classes.rowSelected]: item.complete })}
      >
        <td>
          <Checkbox
            checked={item.complete}
            onChange={() => onToggleRow(item)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <DeleteRow
            username={username}
            rowId={item.id}
            fetchData={fetchData}
          />
        </td>
      </tr>
    );
  });

  const indeterminate =
    items.some((item) => item.complete) &&
    !items.every((item) => item.complete);

  const allChecked = !!items.length && items.every((item) => item.complete);
  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              <Checkbox
                onChange={onToggleAll}
                checked={allChecked}
                indeterminate={indeterminate}
                transitionDuration={0}
              />
            </th>
            <th>Task</th>
            <th style={{ width: rem(40) }}>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
