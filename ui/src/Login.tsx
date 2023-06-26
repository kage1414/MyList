import { Box, Button, TextInput, createStyles, rem } from "@mantine/core";

import { useForm } from "@mantine/form";

type Props = {
  username: string;
  handleUsername: (username: string) => void;
};

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    height: rem(54),
    paddingTop: rem(18),
  },
  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
  button: {
    height: rem(54),
    width: rem(100),
    marginLeft: rem(20),
  },
}));

export const Login = ({ handleUsername }: Props) => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      username: "",
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleUsername(form.values.username);
  };

  return (
    <Box className={classes.container}>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextInput
          label="Username"
          placeholder="Username"
          classNames={classes}
          {...form.getInputProps("username")}
        />
        <Button className={classes.button} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
