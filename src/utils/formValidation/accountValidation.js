function emailValidator(email) {
  if (email === '') {
    return 'Email field is empty';
  }
  return '';
}

function usernameValidator(username) {
  if (username === '') {
    return 'Username field is empty';
  }
  return '';
}

function passwordValidator(password) {
  if (password === '') {
    return 'Password field is empty';
  }
  return '';
}

const keyMap = {
  Email: emailValidator,
  Username: usernameValidator,
  Password: passwordValidator,
};

function validate(account) {
  /* eslint-disable */
  for (const field in account) {
    account[field].error = keyMap[account[field].displayName](account[field].value);
    if (account[field].error) {
      return true;
  /* eslint-enable */
    }
  }
  return false;
}

export default validate;
