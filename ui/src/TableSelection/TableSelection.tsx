import { Item } from "./TableSelection.container";

import { Table, Checkbox, ScrollArea, Group, Text, rem } from "@mantine/core";
import { useStyles } from "./styles";
import { DeleteRow } from "./DeleteRow";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useListState } from "@mantine/hooks";
import { IconGripVertical } from "@tabler/icons-react";
import { useEffect } from "react";

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
  onDragRow: (
    itemId: string,
    priority: number,
    shouldRefetch?: boolean
  ) => void;
};

export const TableSelection = ({
  items,
  username,
  fetchData,
  onToggleAll,
  onToggleRow,
  onDragRow,
}: Props) => {
  const { classes } = useStyles();
  const [state, { reorder, setState }] = useListState<Item>([]);

  const rows = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided) => (
        <tr
          className={classes.item}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <td>
            <div className={classes.dragHandle} {...provided.dragHandleProps}>
              <IconGripVertical size="1.05rem" stroke={1.5} />
            </div>
          </td>
          <td style={{ width: rem(40) }}>
            <Checkbox
              checked={item.complete}
              onChange={() => onToggleRow(item)}
              transitionDuration={0}
            />
          </td>
          <td style={{ width: rem(120) }}>
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
          <td>{item.priority}</td>
        </tr>
      )}
    </Draggable>
  ));

  const allChecked = !!items.length && items.every((item) => item.complete);
  const indeterminate = items.some((item) => item.complete) && !allChecked;

  useEffect(() => {
    setState(items);
  }, [items, setState]);

  return (
    <ScrollArea>
      <DragDropContext
        onDragEnd={({ destination, source, draggableId }) => {
          reorder({ from: source.index, to: destination?.index || 0 });
          onDragRow(draggableId, destination?.index ?? -1, true);
        }}
      >
        <Table
          sx={{ minWidth: rem(420), "& tbody tr td": { borderBottom: 0 } }}
        >
          <thead>
            <tr>
              <th style={{ width: rem(40) }} />
              <th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={onToggleAll}
                  checked={allChecked}
                  indeterminate={indeterminate}
                  transitionDuration={0}
                />
              </th>
              <th style={{ width: rem(120) }}>Name</th>
              <th style={{ width: rem(40) }}>Delete</th>
              <th style={{ width: rem(40) }}>Priority</th>
            </tr>
          </thead>
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {rows}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </ScrollArea>
  );
};
