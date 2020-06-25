import React, {useState, useEffect, useRef, useCallback} from 'react';
import {CircleAlertMajorFilled} from '@shopify/polaris-icons';

import {TextField} from '../TextField';
import {Button} from '../Button';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {Banner} from '../Banner';

import styles from './PhoneField.scss';

interface Country {
  /** The country flag */
  image: string;
  /** Country name */
  countryName: string;
  /** Country area code */
  countryCode: string;
  /** Phone number display format */
  displayFormat: number[];
  /** Possible area codes for a country. Used to distinguish between countries with same country codes */
  areaCodes?: number[];
  formatter?(): void;
}

export interface PhoneFieldProps {
  /** Placeholder text  */
  placeholder?: string;
  /** Textfield label  */
  labelName: string;
  /** Hides the label for accessibility */
  labelHidden?: boolean;
  /** Is textfield optional */
  optional?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Country list in dropdown */
  countries: Country[];
}

export function PhoneField({
  errorMessage,
  placeholder,
  labelName,
  labelHidden,
  optional,
  countries,
}: PhoneFieldProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [popoverActive, setPopoverActive] = useState(countries.length > 1);
  const [validPhoneNumber, setValidPhoneNumber] = useState<boolean | null>(
    null,
  );

  const [error, setError] = useState(
    errorMessage ? errorMessage : 'Please enter a valid mobile phone number!',
  );

  // Keeps track of selectedCountry information
  const [selectedCountry, setSelectedCountry] = useState(
    countries[0].countryName,
  );

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countries[0].countryCode,
  );

  const [selectedDisplayFormat, setSelectedDisplayFormat] = useState(
    countries[0].displayFormat,
  );

  // Conduct research on which country appears first
  const [searchBarText, setSearchBarText] = useState('');
  const allCountries = countries.map(
    ({countryName, image, countryCode}, index) => ({
      content: `${image}  ${countryName} (${countryCode})`,
      onAction: () => handleSelected(index),
    }),
  );

  const [countryOptions, setCountryOptions] = useState(allCountries);

  /** Callback function for handling when the popover is clicked */
  const togglePopoverActive = useCallback(() => {
    setPopoverActive((popoverActive) => !popoverActive);
    setSearchBarText('');
    setCountryOptions(allCountries);
  }, [allCountries]);

  const retrieveCountryIndex = useCallback(
    (countryName: string) => {
      const foundIndex = countries.findIndex(
        (element) => element.countryName === countryName,
      );
      return foundIndex;
    },
    [countries],
  );

  /** Callback function for handling when a country is selected */
  const handleSelected = useCallback(
    (index) => {
      setSelectedCountry(countries[index].countryName);
      setSelectedCountryCode(countries[index].countryCode);
      setSelectedDisplayFormat(countries[index].displayFormat);
      togglePopoverActive();
    },
    [countries, togglePopoverActive],
  );

  const checkValidPhoneNumber = useCallback((phoneNum, countryArr, index) => {
    const numDigits: number = countryArr[index].displayFormat.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
    );

    const countryCodeLength: number = countryArr[index].countryCode.length;

    return phoneNum.length === numDigits + countryCodeLength;
  }, []);

  /** Given a formatted string, if it includes '+', then it determines what country */
  const extractNumbersRegex = useCallback(
    (originalStr: string) => {
      let numberStr = originalStr;
      if (numberStr.startsWith('+')) {
        const filteredCountries = countries
          .filter(
            (countryObj) =>
              countryObj.countryCode.length +
                countryObj.displayFormat.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                ) ===
              numberStr.length,
          )
          .filter((countryObj) => numberStr.startsWith(countryObj.countryCode));

        if (filteredCountries.length > 0) {
          const countryCode = filteredCountries[0].countryCode;
          numberStr = originalStr.substring(countryCode.length);

          const countryIndex = countries.findIndex(
            (countryObj) =>
              countryObj.countryName === filteredCountries[0].countryName,
          );

          handleSelected(countryIndex);
        }
      }

      const extractNumbersRegex = /\d+/g;
      const numberPresent = extractNumbersRegex.test(numberStr);

      const phoneNum = numberPresent
        ? numberStr.match(extractNumbersRegex).join('')
        : '';

      const selectedCountryIndex = countries.findIndex(
        (countryObj) => countryObj.countryName === selectedCountry,
      );

      setPhoneNumber(`${selectedCountryCode}${phoneNum}`);
      setValidPhoneNumber(
        checkValidPhoneNumber(
          `${selectedCountryCode}${phoneNum}`,
          countries,
          selectedCountryIndex,
        ),
      );
      return phoneNum;
    },
    [
      checkValidPhoneNumber,
      countries,
      handleSelected,
      selectedCountry,
      selectedCountryCode,
    ],
  );

  /** Callback function converts the phone number using displayFormatter */
  const convertPhoneNumber = useCallback((phoneNumber, displayFormatter) => {
    const phoneNumberMaxLength = displayFormatter.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
    );

    if (phoneNumber === '' || phoneNumber.length > phoneNumberMaxLength) {
      return phoneNumber;
    }

    let regexCaptureGroups = '';
    displayFormatter.forEach((currentValue: number) => {
      regexCaptureGroups = regexCaptureGroups.concat(
        `(\\d{0,${currentValue}})`,
      );
    });

    const regexExp = new RegExp(`^${regexCaptureGroups}$`);
    const formattedPhoneNum = phoneNumber
      .match(regexExp)
      .slice(1, 1 + displayFormatter.length)
      .filter(Boolean)
      .join(' ');
    return formattedPhoneNum;
  }, []);

  /** Callback function when the text in the phone number changes */
  const handlePhoneNumber = useCallback(
    (phoneNum) => {
      const allNumbers = extractNumbersRegex(phoneNum);
      setFormattedPhoneNumber(
        convertPhoneNumber(allNumbers, selectedDisplayFormat),
      );
    },
    [convertPhoneNumber, extractNumbersRegex, selectedDisplayFormat],
  );

  /** When the user changes the country, the formatting for phone number changes */
  useEffect(() => {
    handlePhoneNumber(formattedPhoneNumber);
  }, [formattedPhoneNumber, handlePhoneNumber, phoneNumber, validPhoneNumber]);

  /** Given the searchbar, we search for matches for the country name */
  const retrieveCountries = useCallback(
    (search: string) => {
      const results = countries
        .filter((countryObj) =>
          countryObj.countryName.toLowerCase().startsWith(search.toLowerCase()),
        )
        .map(({countryName, image, countryCode}) => ({
          content: `${image} ${countryName} (${countryCode})`,
          onAction: () => {
            handleSelected(retrieveCountryIndex(countryName));
          },
        }));

      return results;
    },
    [countries, handleSelected, retrieveCountryIndex],
  );

  /** Callback function for handling when the text in search bar changes */
  const handleSearchBar = useCallback(
    (country) => {
      setSearchBarText(country);
      setCountryOptions(retrieveCountries(country));
    },
    [retrieveCountries],
  );

  /** Handles the button that clicks for the popover */
  const activator =
    countries.length > 1 ? (
      // eslint-disable-next-line shopify/jsx-no-hardcoded-content
      <Button onClick={togglePopoverActive} disclosure>
        {`${selectedCountry} (${selectedCountryCode})`}
      </Button>
    ) : (
      <Button>{selectedCountry}</Button>
    );

  const displayErrorMessage =
    validPhoneNumber === true || validPhoneNumber == null ? null : (
      <p>{error}</p>
    );

  return (
    <div>
      <TextField
        label={optional ? `${labelName} (optional)` : labelName}
        autoComplete="tel"
        type="tel"
        placeholder={placeholder}
        value={formattedPhoneNumber}
        onChange={handlePhoneNumber}
        labelHidden={labelHidden}
        connectedLeft={
          <Popover
            active={popoverActive}
            activator={activator}
            onClose={togglePopoverActive}
            preferredAlignment="left"
          >
            <div className={styles.Searchbar}>
              <TextField
                label="Store name"
                value={searchBarText}
                labelHidden
                placeholder="Search for a country"
                onChange={handleSearchBar}
              />
            </div>

            <ActionList items={countryOptions} />
          </Popover>
        }
      />
      {displayErrorMessage}
    </div>
  );
}
