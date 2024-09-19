export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpFormValue extends SignInForm {
  confirmPassWord: string;
}
