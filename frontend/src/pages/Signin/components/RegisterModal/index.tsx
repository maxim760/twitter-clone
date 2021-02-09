import React from "react";
import { useStylesSignIn } from "../../index";
import { ModalBlock } from "../../../../components/ModalBlock";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormModalProps, RegisterFormProps } from "../types";
//* form-hook
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MessageAlert } from "../../../../components";
import { fetchSignUp } from "../../../../store/ducks/user/actionCreators";
import {
  selectUserLoadingStatus,
  selectUserLoadingRegisterStatus,
  selectUserSignUpError,
} from "../../../../store/ducks/user/selectors";
import { LoadingStatus } from "../../../../store/types";
import { useAlert } from "../../../../hooks/useAlert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";

const RegisterForSchema = yup.object().shape({
  //@ts-ignore
  fullname: yup.string().required("Введите имя"),
  //@ts-ignore
  username: yup.string().required("Введите логин"),
  //@ts-ignore
  email: yup.string().email("Неправильная почта").required("Введите почту"),
  //@ts-ignore
  password: yup
    .string()
    .min(6, "Минимальная длина пароля - 6 символов")
    .matches(/^(?=\S*?[a-z])(?=\S*?[A-Z])(?=\S*?\d)(.){6,}$/, {
      message: "В пароле должны быть буквы обоих регистров и цифры",
    })
    .required("Введите пароль"),
  //@ts-ignore
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

export const RegisterModal: React.FC<FormModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const { t } = useTranslation(["form", "buttons"]);
  const classes = useStylesSignIn();
  const {
    handleSubmit,
    errors,
    control,
    register,
    getValues,
  } = useForm<RegisterFormProps>();

  React.useEffect(() => {
    if (!open) {
      handleCloseNotification();
    }
  }, [open]);

  const {
    onSubmit,
    handleCloseNotification,
    visibleNotification,
    isVisibleNotification,
    isLoadingNotification,
  } = useAlert<RegisterFormProps>({
    errorSelector: [selectUserSignUpError, t("form:messages.error.register")],
    successMessage: t("form:messages.success.register"),
    callback: fetchSignUp,
    selector: selectUserLoadingRegisterStatus,
  });
  return (
    <ModalBlock title={t("buttons:createAcc")} visible={open} onClose={onClose}>
      <form data-testid="register" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          className={classes.loginFormControl}
          component="fieldset"
          fullWidth
        >
          <FormGroup aria-label="position" row>
            <TextField
              defaultValue=""
              error={!!errors.fullname}
              helperText={
                errors.fullname &&
                (errors.fullname?.message ||
                  t("form:messages.validation.required.fullname"))
              }
              className={classes.loginRegisterField}
              autoFocus
              name="fullname"
              label={t("form:fullname")}
              type="name"
              inputRef={register({
                required: {
                  value: true,
                  message: t("form:messages.validation.required.fullname"),
                },
              })}
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
                  message: t("form:messages.validation.required.username"),
                },
              })}
              defaultValue=""
              error={!!errors.username}
              helperText={
                errors.username &&
                (errors.username?.message ||
                  t("form:messages.validation.required.username"))
              }
              className={classes.loginRegisterField}
              autoFocus
              name="username"
              label={t("form:username")}
              type="name"
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
                  message: t("form:messages.validation.required.email"),
                },
                pattern: {
                  value: /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/,
                  message: t("form:messages.validation.error.email"),
                },
              })}
              defaultValue=""
              error={!!errors.email}
              helperText={
                errors.email &&
                (errors.email?.message ||
                  t("form:messages.validation.error.email"))
              }
              className={classes.loginRegisterField}
              autoFocus
              name="email"
              label="E-Mail"
              type="email"
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
              defaultValue=""
              error={!!errors.password}
              helperText={
                errors.password &&
                (errors.password?.message ||
                  t("form:messages.validation.error.password"))
              }
              className={classes.loginRegisterField}
              autoFocus
              name="password"
              label={t("form:password")}
              type="password"
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
                validate: (value) => value === getValues("password") || `${t("form:messages.validation.error.passwords")}` ,
              })}
              defaultValue=""
              error={!!errors.password2}
              helperText={
                errors.password2 &&
                (errors.password2?.message ||
                  t("form:messages.validation.error.password"))
              }
              className={classes.loginRegisterField}
              autoFocus
              name="password2"
              label={t("form:repeat")}
              type="password"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoadingNotification}
            >
              {isLoadingNotification ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("buttons:register")
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
