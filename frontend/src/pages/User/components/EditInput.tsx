import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { selectEditNeededProp } from "../../../store/ducks/edit/selectors";
import { setPropEditByPropName } from "../../../store/ducks/edit/actionCreators";
import { IEditInfo } from "../../../store/ducks/edit/contracts/state";
import { ImageObj } from "../../../components/AddTweetForm";
import { debounceEvent } from "../../../utils/debounceEvent";

export interface EditInputProps {
  name: keyof IEditInfo;
  labelName: string;
  maxLen?: number;
  type?: string;
  rows?: number;
  shrink?: boolean;
}

export const EditInput: React.FC<EditInputProps> = ({
  labelName,
  name,
  maxLen,
  type = "text",
  rows,
  shrink = false,
}): React.ReactElement => {
  const res = useSelector(selectEditNeededProp(name));
  const dispatch = useDispatch();
  const handleDispatchData: (e:any) => void = debounceEvent(
    (e: any) =>
      dispatch(setPropEditByPropName({ prop: name, value: e.target.value })),
    300
  );
  const currentValue = React.useMemo(() => {

    return res as string | null;
  }, []);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [len, setLen] = React.useState(0);
  const [value, setValue] = React.useState<null | string>(currentValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e?.target?.value === "string") {
      setLen(e.target.value.length);
      setValue(e.target.value);
      handleDispatchData(e)
    }
  };
  return (
    <FormControl fullWidth className={"user__input"}>
      <TextField
        onChange={handleChange}
        fullWidth
        value={value || ""}
        defaultValue={currentValue}
        variant="outlined"
        name={name}
        inputRef={inputRef}
        multiline={!!rows}
        rows={rows || 1}
        rowsMax={rows || 1}
        type={type || "text"}
        label={labelName}
        inputProps={{ maxLength: maxLen }}
        InputLabelProps={
          shrink
            ? {
                shrink: true,
              }
            : {}
        }
      />

      {maxLen ? (
        <span className={"user__input-helper"}>
          {len}/{maxLen}
        </span>
      ) : null}
    </FormControl>
  );
};
