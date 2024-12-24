exports.generateRandomString = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};
