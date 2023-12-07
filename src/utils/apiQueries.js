export const getCountryInfo = async (country) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  const data = await response.json();
  return data[0];
};
