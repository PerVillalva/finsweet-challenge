import fetchCountryData from '$utils/dropdown-data/getPhoneData';
import { getUserLocation } from '$utils/dropdown-data/getUserLocation';

import { type CountryData, EVENTS, SELECTORS, STATE } from '../consts';
import { focusDropdownOption, handleDropdownNavigation } from './dropdown-controls';
import { addCountryElementToPage } from './populate-list';

// Global variables
const hiddenInput = document.querySelector(SELECTORS.HIDDEN_INPUT) as HTMLElement;
const dropdownList = document.querySelector(SELECTORS.DROPDOWN_LIST) as HTMLElement;
const dropdownToggle = document.querySelector(SELECTORS.DROPDOWN_TOGGLE) as HTMLElement;
const dropdownToggleImg = dropdownToggle.querySelector('img') as HTMLElement;
const dropdownToggleDiv = dropdownToggle.querySelector('div') as HTMLElement;
let currentSelectedItem: Element | null = null;

/* ------------------------------------------------ Dropdown event listeners ------------------------------------------------ */

function listenToKeyPress(dropdownOptions: Element[]) {
  dropdownList.addEventListener(EVENTS.KEYDOWN, (event) => {
    const inputValue = (event as KeyboardEvent).key;
    focusDropdownOption(inputValue, dropdownOptions);
    handleDropdownNavigation(event, dropdownOptions);
  });
}

/* ------------------------------------------------ Manage dropdown interactions and states ------------------------------------------------ */

// Track dropdown state and focus the current active element
function observeDropdownState() {
  new MutationObserver(() => {
    const isOpen = dropdownToggle.classList.contains(STATE.OPEN);
    isOpen ? (currentSelectedItem as HTMLElement).focus() : '';
  }).observe(dropdownToggle, { attributes: true, attributeFilter: ['class'] });
}

// Dropdown inital state
function dropdownInit(userLocation: string, countryData: Array<CountryData>) {
  // Remove placeholder element from the page
  const placeholderElement = document.querySelector(
    '#w-dropdown-list-0 > div > a:nth-child(1)'
  ) as HTMLElement;
  placeholderElement.remove();

  // Set ARIA attribute in the dropdown toggle element
  dropdownToggle.setAttribute('aria-haspopup', 'listbox');

  const defaultCountryCode = userLocation || 'US';
  const dropdownOptionsArray = Array.from(document.querySelectorAll(SELECTORS.DROPDOWN_ITEM));

  for (const option of dropdownOptionsArray) {
    const optionCountryCode = option.querySelector('div')?.textContent;
    if (optionCountryCode === defaultCountryCode) {
      currentSelectedItem = option;
    }
  }
  listenToKeyPress(dropdownOptionsArray);

  const initialCountry = countryData.find(
    (countryItem) => countryItem.countryISO === defaultCountryCode
  );
  observeDropdownState();
  if (initialCountry) {
    updateInformation(initialCountry);
  }
}

// Update country information on dropdown selection
function updateInformation(selectedCountry: CountryData) {
  dropdownToggleImg.setAttribute('src', selectedCountry.flagSVG);
  dropdownToggleImg.setAttribute('alt', `${selectedCountry.name} Flag`);
  dropdownToggleDiv.textContent = selectedCountry.phonePrefix;
  hiddenInput.setAttribute('value', selectedCountry.countryISO);
}

// Close dropdown menu and focus the dropdown toggle button
export function closeDropdown() {
  if ('ontouchstart' in window) {
    // On mobile devices, trigger a click event
    dropdownToggle.dispatchEvent(new Event(EVENTS.CLICK));
  } else {
    // On desktop, trigger a mouseup event
    dropdownToggle.dispatchEvent(new Event(EVENTS.MOUSEUP));
  }
  dropdownToggle.focus();
}

// Manage currently selected item classes and attributes
function handleSelectItem(item: Element) {
  currentSelectedItem?.classList.remove(STATE.CURRENT);
  currentSelectedItem = item;
  item.classList.add(STATE.CURRENT);
  item.setAttribute('aria-selected', 'true');
}

/* ------------------------------------------------ Select dropdown item interaction ------------------------------------------------ */

// Select a dropdown item and update information
function selectDropdownItem(countryData: Array<CountryData>) {
  const dropdownItems = Array.from(document.querySelectorAll(SELECTORS.DROPDOWN_ITEM));

  for (const item of dropdownItems) {
    item.addEventListener(EVENTS.CLICK, () => {
      const selectedCountry = countryData.find(
        (country) => country.name === (item as HTMLAnchorElement).title
      );
      if (selectedCountry) {
        handleSelectItem(item);
        closeDropdown();
        updateInformation(selectedCountry);
      }
    });
  }
}

/* ------------------------------------------------ Main dropdown function ------------------------------------------------ */

export async function dropdownFunction() {
  try {
    const [countriesArray, userLocation] = await Promise.all([
      fetchCountryData(),
      getUserLocation(),
    ]);

    if (countriesArray) {
      countriesArray.forEach(addCountryElementToPage);
      dropdownInit(userLocation, countriesArray);
      selectDropdownItem(countriesArray);
    } else {
      console.error('Unable to fetch country data.');
    }
  } catch (error) {
    console.error(error);
  }
}
