const isVaildEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const onRegisterPress = (email, password, confirmPassword) => {
  if (email === "" && password === "" && confirmPassword === "") {
    return false;
  }

  if (password === "") {
    return false;
  }

  if (email === "") {
    return false;
  }

  if (confirmPassword === "") {
    return false;
  }

  if (password !== confirmPassword) {
    return false;
  }

  if (password.length < 6) {
    return false;
  }

  if (!isVaildEmail(email)) {
    return false;
  }

  return true;
};

function sum(a, b) {
  return a + b;
}

module.exports = {
  onRegisterPress,
};
