import { List } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  username: string;
};

type Item = {
  id: string;
  name: string;
  priority: number;
};

type Data = {
  items: Item[];
};

export const ListPage = ({ username }: Props) => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    axios<Data>("/api/items", { method: "GET", params: { username } }).then(
      ({ data: { items } }) => {
        const listNames = items
          .sort((a, b) => {
            if (a.priority < b.priority) {
              return -1;
            }
            if (a.priority > b.priority) {
              return 1;
            }
            return 0;
          })
          .map(({ name }) => name);
        setItems(listNames);
      }
    );
  }, [username]);

  return (
    <List>
      {items.map((item) => (
        <List.Item>{item}</List.Item>
      ))}
    </List>
  );
};
