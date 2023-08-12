import axios from 'axios';

import type { CountryData, Flags, Idd, Name } from '../consts';

// Retrive the relevant data from the REST Countries API
async function fetchCountryData() {
  try {
    const response = await axios.get(
      'https://restcountries.com/v3.1/all?fields=name,cca2,flags,idd'
    );
    const { data } = response;
    const allCountries: Array<CountryData> = [];

    data.forEach((country: { name: Name; flags: Flags; cca2: string; idd: Idd }) => {
      const { name, flags, cca2, idd } = country;
      const countryData: CountryData = {
        name: name.common,
        flagSVG: flags.svg,
        countryISO: cca2,
        phonePrefix: `${idd.root}${idd.suffixes.length === 1 ? idd.suffixes[0] : ''}`,
      };
      allCountries.push(countryData);
    });
    return allCountries;
  } catch (error) {
    console.error(error);
  }
}

export default fetchCountryData;
