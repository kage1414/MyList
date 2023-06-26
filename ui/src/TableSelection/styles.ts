import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  addRow: {
    justifyContent: "start",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  },
  logout: {
    width: 100,
    position: "fixed",
    top: 50,
    left: 50,
  },
}));
