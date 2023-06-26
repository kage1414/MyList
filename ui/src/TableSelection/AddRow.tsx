import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useStyles } from "./styles";
import axios from "axios";

type Props = {
  fetchData: () => void;
  username: string;
  onLogout: React.MouseEventHandler<HTMLButtonElement>;
};

export const AddRow = ({ fetchData, username, onLogout }: Props) => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      newItem: "",
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post("/api/item", { name: form.values.newItem, username })
      .then(() => {
        fetchData();
        form.reset();
      });
  };

  return (
    <Box className={classes.addRowContainer}>
      <Button className={classes.logout} onClick={onLogout}>
        Logout
      </Button>
      <form className={classes.addRow} onSubmit={handleSubmit}>
        <TextInput placeholder="Item" {...form.getInputProps("newItem")} />
        <Button type="submit">Add</Button>
      </form>
    </Box>
  );
};
