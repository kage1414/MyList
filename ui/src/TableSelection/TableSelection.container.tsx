import { useCallback, useEffect, useState } from "react";
import { TableSelection } from "./TableSelection";
import axios from "axios";
import { AddRow } from "./AddRow";
import { Box, Button } from "@mantine/core";
import { useStyles } from "./styles";

const INTERVAL = 60000;

type Props = {
  username: string;
  onLogout: React.MouseEventHandler<HTMLButtonElement>;
};

export type Item = {
  id: string;
  name: string;
  priority: number;
  complete: boolean;
};

type Data = {
  items: Item[];
};

export const TableSelectionContainer = ({ username, onLogout }: Props) => {
  const { classes } = useStyles();
  const [items, setItems] = useState<Item[]>([]);

  const fetchData = useCallback(() => {
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
  }, [username]);

  const onToggleRow = async (
    item: Item,
    complete?: boolean,
    shouldRefetch = true
  ) => {
    const body = { ...item, username };
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

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <Box className={classes.container}>
      <AddRow fetchData={fetchData} username={username} onLogout={onLogout} />
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
