import { worldMill } from "@react-jvectormap/world";

export const filterCountryList = (countryList, arg) => {
  const regex = new RegExp(arg, "i");
  return countryList.filter((country) => country.match(regex));
};

export const countryCodes = worldMill.content.paths;

Object.keys(countryCodes).forEach((countryCode) => {
  let name = countryCodes[countryCode].name;
  if (name.includes("Rep.")) {
    name = name.replace("Rep.", "Republic");
  }

  if (name.includes("Dem.")) {
    name = name.replace("Dem.", "Democratic");
  }

  if (name.includes("S.")) {
    name = name.replace("S.", "South");
  }

  if (name.includes("Is.")) {
    name = name.replace("Is.", "Islands");
  }

  if (name.includes("Fr.")) {
    name = name.replace("Fr.", "French");
  }

  if (name.includes("W.")) {
    name = name.replace("W.", "Western");
  }
  if (name === "Democratic Republic Korea") {
    name = "North Korea";
  }
  if (name === "Korea") {
    name = "South Korea";
  }

  if (name === "Lao PDR") {
    name = "Laos";
  }

  if (name === "French South Antarctic Lands") {
    name = "French Southern and Antarctic Lands";
  }

  if (name === "Democratic Republic Congo") {
    name = "DR Congo";
  }

  if (name === "Congo") {
    name = "Republic of the Congo";
  }

  if (name === "Bosnia and Herz.") {
    name = "Bosnia and Herzegovina";
  }
  if (name === "Eq. Guinea") {
    name = "Equatorial Guinea";
  }

  if (name === "N. Cyprus") {
    name = "Republic of Cyprus";
    return delete countryCodes[countryCode];
  }

  worldMill.content.paths[countryCode].name = name;
});

export const countryNames = Object.keys(countryCodes).reduce((total, code) => {
  return { ...total, [countryCodes[code].name]: code };
}, {});

export const countryList = Object.values(worldMill.content.paths)
  .map(({ name }) => name)
  .sort();
