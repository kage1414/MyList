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
  item: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  dragHandle: {
    ...theme.fn.focusStyles(),
    width: rem(40),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
  },
}));
