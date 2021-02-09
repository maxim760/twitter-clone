export interface FormModalProps {
  open: boolean,
  onClose(): void,
}
export interface LoginFormProps {
  username: string,
  password: string,
}
export interface RegisterFormProps {
  email: string,
  username: string,
  fullname: string,
  password: string,
  password2: string,
}
