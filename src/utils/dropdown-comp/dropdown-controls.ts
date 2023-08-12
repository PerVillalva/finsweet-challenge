import { closeDropdown } from './dropdown';

export function focusDropdownOption(inputValue: string, dropdownOptions: Element[]) {
  for (const option of dropdownOptions) {
    const countryCode = option.querySelector('div[data-element="value"]') as HTMLElement;
    if (countryCode.textContent?.toLowerCase().startsWith(inputValue.toLowerCase())) {
      (option as HTMLElement).focus();
      break;
    }
  }
}

export const handleDropdownNavigation = (event: Event, dropdownOptions: Element[]) => {
  const { key } = event as KeyboardEvent;

  const keyMappings = {
    ArrowUp: -1,
    ArrowDown: 1,
    ArrowLeft: -1,
    ArrowRight: 1,
  };

  const isEnter = key === 'Enter';
  const isTab = key === 'Tab';
  const isSpace = key === ' ';

  event.preventDefault();

  if (isEnter || isSpace) {
    const focusedOption = dropdownOptions.find((option) => option === document.activeElement);
    if (focusedOption) {
      (focusedOption as HTMLElement).click();
    }
    return;
  }

  if (isTab) {
    closeDropdown();
    return;
  }

  const indexChange = keyMappings[key as keyof typeof keyMappings] || 0;
  if (indexChange !== 0) {
    const focusedOptionIndex = dropdownOptions.findIndex(
      (option) => option === document.activeElement
    );
    if (focusedOptionIndex >= 0) {
      const nextIndex = focusedOptionIndex + indexChange;
      const nextOption = dropdownOptions[nextIndex];
      if (nextOption) {
        (nextOption as HTMLElement).focus();
      }
    }
  }
};
