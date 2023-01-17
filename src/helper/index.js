export const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);

  return dateString + randomness;
};

export function validEmail(text) {
  const regex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  return !regex.test(text);
}

export function minMaxLength(text, minLength, maxLength) {
  let result = !text || text.length < minLength;

  if (maxLength) {
    result = text.length > maxLength || result;
  }

  return result;
}

export const checkIfAnyError = (formDataError) => {
  let result;
  return (result = !Object.values(formDataError).some(
    (item) => item.length > 0
  ));
};

export function userExists(username, allusers) {
  return allusers.some(function (el) {
    console.log(el.email === username, " Checking the ");
    return el;
  });
}
