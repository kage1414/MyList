import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";

type Props = {
  username: string;
  rowId: string;
  fetchData: () => void;
};
export const DeleteRow = ({ username, rowId, fetchData }: Props) => {
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    axios.delete("/api/item", { data: { id: rowId, username } }).then(() => {
      fetchData();
    });
  };
  return (
    <ActionIcon onClick={handleDelete}>
      <IconTrash />
    </ActionIcon>
  );
};
