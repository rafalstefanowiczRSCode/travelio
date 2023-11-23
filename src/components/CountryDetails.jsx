import React from "react";

const CountryDetails = ({
  capital = "",
  languages = [],
  currencies = [],
  population = "",
}) => {
  console.log(currencies);
  const language = languages.slice(0, 3).join(", ");
  const currency = currencies.slice(0, 3).join(", ");

  return (
    <div className="detailsContainer">
      <div>
        <span className="detailHeader">Capital: </span>
        <span>{capital}</span>
      </div>
      <div>
        <span className="detailHeader">Population: </span>
        <span>{population}</span>
      </div>
      <div>
        <span className="detailHeader">Language: </span>
        <span>{language}</span>
      </div>
      <div>
        <span className="detailHeader">Currency: </span>
        <span>{currency}</span>
      </div>
    </div>
  );
};

export default CountryDetails;
