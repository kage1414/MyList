import { useEffect, useState } from "react";
import { TableSelection } from "./TableSelection";
import axios from "axios";
import { AddRow } from "./AddRow";

type Props = {
  username: string;
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

export const TableSelectionContainer = ({ username }: Props) => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchData = () => {
    axios<Data>("/api/items", { method: "GET", params: { username } }).then(
      ({ data: { items } }) => {
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

  useEffect(fetchData, [username]);

  return (
    <>
      <AddRow fetchData={fetchData} username={username} />
      <TableSelection items={items} username={username} fetchData={fetchData} />
    </>
  );
};
