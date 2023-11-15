import { worldMill } from "@react-jvectormap/world";

export const countryList = Object.values(worldMill.content.paths)
  .map(({ name }) => name)
  .sort();

export const filterCountryList = (countryList, arg) => {
  const regex = new RegExp(arg, "i");
  return countryList.filter((country) => country.match(regex));
};

export const countryCodes = worldMill.content.paths;
export const countryNames = Object.keys(countryCodes).reduce((total, code) => {
  return { ...total, [countryCodes[code].name]: code };
}, {});
