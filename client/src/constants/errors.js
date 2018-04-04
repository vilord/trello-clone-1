export const invalidEmail = {
  kind: 'invalidEmail',
  header: 'Verify email!',
  message: "That doesn't look like an email address…",
};

export const shortPassword = {
  kind: 'shortPassword',
  header: 'Password is too short!',
  message: 'Your password must be at least 8 characters long.',
};

export const userExists = {
  kind: 'userExists',
  header: 'User already exists!',
  message: 'Email is already in use by another account.'
};

export const wrongCredentials ={
  kind: 'wrongCredentials',
  header: 'Something wrong!',
  message: 'Incorrect email (username) or password.'
};

export const serverError = {
  kind: 'serverError',
  header: 'Unknown Server Error!',
  message: 'Our server may be down. Please retry later!'
};
