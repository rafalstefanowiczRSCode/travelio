const generateDescription = (str) => {
  const maxCharacters = 26;
  const slashIndex = str.indexOf("/");
  let description = str;

  if (slashIndex !== -1) {
    description = str.substring(slashIndex + 1);
  }
  if (description.length <= maxCharacters) {
    return description;
  }
  return description.slice(0, maxCharacters) + "..";
};

export default generateDescription;
