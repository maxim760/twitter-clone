import React from "react";
import { useStylesSignIn } from "../../index";
import { ModalBlock } from "../../../../components/ModalBlock";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormModalProps, LoginFormProps } from "../types";

//* form-hook
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MessageAlert } from "../../../../components";
import { fetchSignIn } from "../../../../store/ducks/user/actionCreators";
import {
  selectUserLoadingStatus,
  selectUserSignInError,
  selectUserLoadingLoginStatus,
} from "../../../../store/ducks/user/selectors";
import { LoadingStatus } from "../../../../store/types";
import { useAlert } from "../../../../hooks/useAlert";
import { useTranslation } from "react-i18next";

//* на момент написания yup вышел 15 часов назад
//* в гитхабе ссылка на typescript supports не рабочая
//* если зайти в docs и там в ts, то код напмсанный там выдает ошибку
//* и в api matches не обязательно принимает 2 параметр, по факту обязательно

const loginForSchema = yup.object().shape({
  //@ts-ignore
  username: yup.string().required("Введите логин"),
  //@ts-ignore
  password: yup
    .string()
    .min(6, "Минимальная длина пароля - 6 символов")
    .matches(/^(?=\S*?[a-z])(?=\S*?[A-Z])(?=\S*?\d)(.){6,}$/, {
      message: "В пароле должны быть буквы обоих регистров и цифры",
    })
    .required("Введите пароль"),
});

export const LoginModal: React.FC<FormModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const { t } = useTranslation(["form", "buttons"]);
  const classes = useStylesSignIn();
  const { handleSubmit, errors, register } = useForm<LoginFormProps>();
  const {
    onSubmit,
    handleCloseNotification,
    visibleNotification,
    isVisibleNotification,
    isLoadingNotification,
  } = useAlert<LoginFormProps>({
    errorSelector: [selectUserSignInError, t("form:messages.error.login")],
    successMessage: t("form:messages.success.login"),
    callback: fetchSignIn,
    selector: selectUserLoadingLoginStatus,
  });
  React.useEffect(() => {
    if (!open) {
      handleCloseNotification();
    }
  }, [open]);

  return (
    <ModalBlock title={t("buttons:toAcc")} visible={open} onClose={onClose}>
      <form data-testid="login" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          component="fieldset"
          fullWidth
          className={classes.loginFormControl}
        >
          <FormGroup aria-label="position" row>
            <TextField
              inputRef={register({
                required: {
                  value: true,
                  message: t("form:messages.validation.required.username"),
                },
              })}
              data-testid={"LoginModalUsername"}
              defaultValue=""
              error={!!errors.username}
              helperText={
                errors.username &&
                (errors.username?.message || t("form:messages.error.username"))
              }
              className={classes.loginSideField}
              autoFocus
              name="username"
              label={t("form:mailOrLog")}
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />

            <TextField
              inputRef={register({
                required: {
                  value: true,
                  message: t("form:messages.validation.required.password"),
                },
                minLength: {
                  value: 6,
                  message: t("form:messages.validation.length.password"),
                },
                pattern: {
                  value: /^(?=\S*?[a-z])(?=\S*?[A-Z])(?=\S*?\d)(.){6,}$/,
                  message: t("form:messages.validation.regex.password"),
                },
              })}
              error={!!errors.password}
              className={classes.loginSideField}
              data-testid="LoginModalPass"
              defaultValue=""
              name="password"
              label={t("form:password")}
              type="password"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              helperText={
                errors.password &&
                (errors.password?.message || t("form:messages.error.password"))
              }
            />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              disabled={isLoadingNotification}
              type="submit"
            >
              {isLoadingNotification ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("buttons:login")
              )}
            </Button>
          </FormGroup>
        </FormControl>
        {isVisibleNotification && (
          <MessageAlert
            open={true}
            onClose={handleCloseNotification}
            severity={visibleNotification!.status}
            text={visibleNotification!.message}
          />
        )}
      </form>
    </ModalBlock>
  );
};
