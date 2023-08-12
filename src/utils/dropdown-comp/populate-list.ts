import { type CountryData, SELECTORS } from '../consts';

// Select dropdown list element
const dropdownList = document.querySelector(SELECTORS.DROPDOWN_LIST) as HTMLElement;

// Create a country dropdown list element
function createCountryElement(countryData: CountryData) {
  const dropdownListEl = document.createElement('a');
  dropdownListEl.setAttribute('tabindex', '0');
  dropdownListEl.setAttribute('aria-selected', 'false');
  dropdownListEl.setAttribute('data-element', 'item');
  dropdownListEl.setAttribute('aria-role', 'option');
  dropdownListEl.setAttribute('href', '#');
  dropdownListEl.classList.add('prefix-dropdown_item', 'w-inline-block');
  dropdownListEl.setAttribute('aria-label', countryData.name);
  dropdownListEl.setAttribute('title', countryData.name);

  const flagImage = document.createElement('img');
  flagImage.setAttribute('src', countryData.flagSVG);
  flagImage.setAttribute('loading', 'lazy');
  flagImage.setAttribute('data-element', 'flag');
  flagImage.setAttribute('alt', `${countryData.name} Flag`);
  flagImage.classList.add('prefix-dropdown_flag');

  const valueDiv = document.createElement('div');
  valueDiv.setAttribute('data-element', 'value');
  valueDiv.textContent = countryData.countryISO;

  dropdownListEl.appendChild(flagImage);
  dropdownListEl.appendChild(valueDiv);

  return dropdownListEl;
}

// Add a country element to the dropdown list
export function addCountryElementToPage(countryData: CountryData) {
  const countryElement = createCountryElement(countryData);
  dropdownList.appendChild(countryElement);
}
