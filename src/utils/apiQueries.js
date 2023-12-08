export const getCountryInfo = async (country) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  const data = await response.json();
  return data[0];
};

const getApiUrl = (country, page) =>
  `https://api.unsplash.com/search/photos?client_id=EnHPWht5jugnt3faJ0V2-BgTXGy_n2m-iqaOuaprGMg&page=${page}&query=${country}`;

export const getUnsplashImages = async (country, page) => {
  const response = await fetch(getApiUrl(country, page));
  const data = await response.json();
  return data;
};
