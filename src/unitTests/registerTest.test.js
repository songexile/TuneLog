const { onRegisterPress } = require("./registerTest");
//email, password, confirmPassword

//testing with invalid email format
test("onRegisterPress", () => {
  expect(onRegisterPress("myemail", "www612", "www612")).toBe(false);
});

//testing with valid email format
test("onRegisterPress", () => {
  expect(onRegisterPress("myemail@gmail.com", "www6121", "www6121")).toBe(true);
});

//testing with invalid password length
test("onRegisterPress", () => {
  expect(onRegisterPress("myemail@gmail.com", "www", "www")).toBe(false);
});

//testing with valid password length
test("onRegisterPress", () => {
  expect(onRegisterPress("myemail@gmail.com", "www6121", "www6121")).toBe(true);
});

//testing with confirm password not equal to password
test("onRegisterPress", () => {
  expect(
    onRegisterPress("myemail@gmail.com", "www6121", "javascript_fam!")
  ).toBe(false);
});

//testing with no email input
test("onRegisterPress", () => {
  expect(onRegisterPress("", "www6121", "www6121")).toBe(false);
});

//testing with no password input
test("onRegisterPress", () => {
  expect(onRegisterPress("myemail@gmail.com", "", "")).toBe(true); //made this one fail
});
