import axios from 'axios';

const getWorldInformation = async () => {
  try {
    const response = await axios({
      method: `GET`,
      url: `https://restcountries.com/v2/all`,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCountryInformation = async () => {
  // languages[0] + alpha2Code -- These two concatonated should be the `locale` needed for the Intl API.
  const worldInfo = await getWorldInformation();
  console.log(worldInfo.data);
  let language = navigator.language;
  let myCountry = [];
  myCountry = worldInfo.data.filter((country) => {
    return `${country.languages[0].iso639_1}-${country.alpha2Code}` === language;
  });
  return myCountry[0];
};
