import TextField from "@material-ui/core/TextField";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";

export const SearchTextField = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiOutlinedInput-root": {
        borderRadius: 30,
        backgroundColor: "#e6ecf0",
        padding: 0,
        paddingLeft: 15,
        "& .Mui-focused": {
          backgroundColor: "#fff",
          "& fieldset": {
            borderWidth: 1,
            borderColor: theme.palette.primary.main,
          },
          "& svg path": {
            fill: theme.palette.primary.main,
          },
        },
        "&:hover": {
          "& fieldset": {
            borderColor: "transparent",
          },
        },
        "& fieldset": {
          borderWidth: 1,
          borderColor: "transparent",
        },
      },
      "& .MuiOutlinedInput-input": {
        padding: "12px 14px 14px 5px",
      },
    },
  })
)(TextField);

