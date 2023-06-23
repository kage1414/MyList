import { Item } from "./TableSelection.container";

import { useState } from "react";
import { Table, Checkbox, ScrollArea, Group, Text, rem } from "@mantine/core";
import { useStyles } from "./styles";
import { DeleteRow } from "./DeleteRow";

type Props = {
  items: Item[];
  username: string;
  fetchData: () => void;
};

export const TableSelection = ({ items, username, fetchData }: Props) => {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === items.length ? [] : items.map((item) => item.id)
    );

  const rows = items.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
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
  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === items.length}
                indeterminate={
                  selection.length > 0 && selection.length !== items.length
                }
                transitionDuration={0}
              />
            </th>
            <th>Task</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
