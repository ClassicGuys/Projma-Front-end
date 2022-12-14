import * as React from "react";
import PerTextField from "./PerTextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    // Name of the component
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: "2rem",
          color: "#fff",
          border: "0.2rem solid var(--mior-bg)",
          borderRadius: "0.5rem",
          "&.Mui-focused": {
            // backgroundColor: "#121212",
            // color: "#000",
            border: "0.2rem solid var(--mui-blue)",
          },
        },
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

const InputName = (props) => {
  const [name, setName] = React.useState(props.name);
  // const [blur, setblur] = React.useState(false);
  const [underline, setUnderline] = React.useState(true);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const blurHandler = () => {
    if (name !== props.name) {
      props.onChangeName(name);
    }
  };

  return (
    <PerTextField>
      <FormControl variant="standard" fullWidth>
        <ThemeProvider theme={theme}>
          <Input
            multiline
            id="component-simple"
            value={name}
            defaultValue={name}
            onChange={handleChange}
            onBlur={blurHandler}
            onFocus={() => {}}
            // onBlur={() => setUnderline(true)}
            disableUnderline={true}
          />
        </ThemeProvider>
      </FormControl>
    </PerTextField>
  );
};

export default InputName;
