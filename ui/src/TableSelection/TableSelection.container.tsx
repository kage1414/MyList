import { useEffect, useState } from "react";
import { TableSelection } from "./TableSelection";
import axios from "axios";
import { AddRow } from "./AddRow";
import { Box } from "@mantine/core";
import { useStyles } from "./styles";

type Props = {
  username: string;
};

export type Item = {
  id: string;
  name: string;
  priority: number;
  complete: boolean;
  username: string;
};

type Data = {
  items: Item[];
};

export const TableSelectionContainer = ({ username }: Props) => {
  const { classes } = useStyles();
  const [items, setItems] = useState<Item[]>([]);

  const fetchData = () => {
    axios<Data>("/api/items", { method: "GET", params: { username } }).then(
      (response) => {
        const {
          data: { items },
        } = response;
        const listNames = items.sort((a, b) => {
          if (a.priority < b.priority) {
            return -1;
          }
          if (a.priority > b.priority) {
            return 1;
          }
          return 0;
        });

        setItems(listNames);
      }
    );
  };

  const onToggleRow = async (
    item: Item,
    complete?: boolean,
    shouldRefetch = true
  ) => {
    const body = item;
    body.complete = complete ?? !item.complete;
    await axios.put("/api/item", body).then(() => {
      if (shouldRefetch) {
        fetchData();
      }
    });
  };

  const onToggleAll: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    items.forEach(async (item, idx) => {
      await onToggleRow(item, e.target.checked, idx === items.length - 1);
    });
  };

  useEffect(fetchData, [username]);

  return (
    <Box className={classes.container}>
      <AddRow fetchData={fetchData} username={username} />
      <TableSelection
        items={items}
        username={username}
        onToggleRow={onToggleRow}
        onToggleAll={onToggleAll}
        fetchData={fetchData}
      />
    </Box>
  );
};
