import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  addRow: {
    flexDirection: "row",
    display: "flex",
  },
  container: { padding: rem(20) },
  logout: {
    width: 100,
  },
  addRowContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingBottom: 30,
  },
}));
