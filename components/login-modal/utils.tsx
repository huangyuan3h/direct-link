export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

export const has1LowCase = /[a-z]+/;
export const has1UpCase = /[A-Z]+/;
export const has1Number = /[0-9]+/;

export const isEmailValid = (email: string) => {
  return emailRegex.test(email);
};

export const isPasswordValid = (password: string) => {
  if (password.length >= 20 || password.length < 6) {
    return false;
  }

  if (!has1LowCase.test(password)) {
    return false;
  }

  if (!has1UpCase.test(password)) {
    return false;
  }

  if (!has1Number.test(password)) {
    return false;
  }

  return true;
};

export const isConfirmPasswordValid = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};
