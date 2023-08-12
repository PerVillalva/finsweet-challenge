/* ------------------------------------------------ TypeScript Types ------------------------------------------------ */
export interface Flags {
  svg: string;
}

export interface Name {
  common: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface CountryData {
  name: string;
  flagSVG: string;
  countryISO: string;
  phonePrefix: string;
}

/* ------------------------------------------------ Constants ------------------------------------------------ */
export const SELECTORS = {
  DROPDOWN_TOGGLE: '.prefix-dropdown_toggle',
  DROPDOWN_ITEM: '.prefix-dropdown_item',
  DROPDOWN_LIST: '.prefix-dropdown_list',
  HIDDEN_INPUT: '#phone-form > div.hide > input',
};

export const STATE = {
  OPEN: 'w--open',
  CURRENT: 'w--current',
};

export const EVENTS = {
  MOUSEUP: 'mouseup',
  CLICK: 'click',
  KEYDOWN: 'keydown',
};
