import React, {useState, useEffect, useRef, useCallback} from 'react';

import {TextField} from '../TextField';
import {Button} from '../Button';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';

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
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [popoverActive, setPopoverActive] = useState(countries.length > 1);
  const [selectedCountry, setSelectedCountry] = useState(
    countries[3].countryName,
  );

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countries[3].countryCode,
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

  /** Callback function for handling when the text in the phone number changes */
  const handleTextChange = useCallback(
    (newValue) =>
      setFormattedPhoneNumber(phoneNumberFormatter(countries, newValue)),
    [countries, phoneNumberFormatter],
  );

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
  /** Callback function for handling the selected country */
  const handleSelected = useCallback(
    (index) => {
      setSelectedCountry(countries[index].countryName);
      setSelectedCountryCode(countries[index].countryCode);
      togglePopoverActive();
    },
    [countries, togglePopoverActive],
  );

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
      <Button onClick={togglePopoverActive} disclosure>
        {`${selectedCountry} (${selectedCountryCode})`}
      </Button>
    ) : (
      <Button>{selectedCountry}</Button>
    );

  const extractNumberFormat = useCallback((numberStr) => {
    const extractNumbersRegex = /\d+/g;
    const numberPresent = extractNumbersRegex.test(numberStr);
    const startsWithPlus = numberStr.startsWith('+') ? '+' : '';
    return numberPresent
      ? `+${numberStr.match(extractNumbersRegex).join('')}`
      : startsWithPlus;
  }, []);

  // Checks if there is at least one country with 'area code object'
  // Passed an array of objects
  function checkAreaCodeExists(countryArr) {
    const filteredCountryArr = countryArr.filter(
      (countryObj) => 'areaCodes' in countryObj,
    );

    return filteredCountryArr !== [];
  }

  // Given a countryArr, where the countryCodes are the same, and countryCode where '+1202'
  function retrieveACfromCountry(countryArr, phoneNum) {
    // If we have '+120255, we obtain '202'
    // If we have '+120', we obtain '20'
    // If we have '+1202', we obtain '202'
    const retrieveAreaCodeFromPhoneNum =
      countryArr[0].countryCode.length + countryArr[0].displayFormat[0] <=
      phoneNum.length
        ? phoneNum.slice(
            countryArr[0].countryCode.length,
            countryArr[0].countryCode.length + countryArr[0].displayFormat[0],
          )
        : phoneNum.slice(countryArr[0].countryCode.length);

    console.log(retrieveAreaCodeFromPhoneNum);
    const filteredCountryArr = countryArr.filter((countryObj) =>
      // countryObj.areaCodes.includes(parseInt(retrieveAreaCodeFromPhoneNum))
      countryObj.areaCodes.includes(parseInt(retrieveAreaCodeFromPhoneNum)),
    );

    return filteredCountryArr;
  }

  const phoneNumberFormatter = useCallback(
    (countryArr, phoneNumber) => {
      const numberStr = extractNumberFormat(phoneNumber);
      console.log(`New Formatted Phone Number: ${numberStr}`);

      // Filter the countries based on country code
      const filteredCountries = countryArr.filter((countryObj) =>
        numberStr.startsWith(countryObj.countryCode),
      );

      if (filteredCountries.length === 1) {
        // Selected Country Object
        const selectedCountryObj = filteredCountries[0];
        const countryIndex = countries.findIndex(
          (countryObj) =>
            countryObj.countryName === selectedCountryObj.countryName,
        );

        setSelectedCountry(countries[countryIndex].countryName);
        setSelectedCountryCode(countries[countryIndex].countryCode);

        // Selected Country, Number of Digits
        const countryMaxDigits = selectedCountryObj.displayFormat.reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
        );

        // If the length of the string is greater than the sum of selectedCountry's countryCode and maxDigits, return it with no formatting
        if (
          numberStr.length >
          selectedCountryObj.countryCode.length + countryMaxDigits
        ) {
          return numberStr;
        }

        /* This section deals with formatting */
        let regexCaptureGroups = `([+]\\d{${
          selectedCountryObj.countryCode.length - 1
        }})`;
        selectedCountryObj.displayFormat.forEach((currentValue) => {
          regexCaptureGroups = regexCaptureGroups.concat(
            `(\\d{0,${currentValue}})`,
          );
        });

        const regexExp = new RegExp(`^${regexCaptureGroups}$`);

        let formattedPhoneNum = numberStr.match(regexExp);
        formattedPhoneNum = formattedPhoneNum
          .slice(1, 1 + selectedCountryObj.displayFormat.length + 1)
          .filter(Boolean)
          .join(' ');

        return formattedPhoneNum;
      }

      if (filteredCountries.length === 0) {
        return numberStr;
      }

      if (filteredCountries.length > 1) {
        // So, we don't pass in '+1', no need to filter (any country with just countryCode)
        if (numberStr === filteredCountries[0].countryCode) {
          return numberStr;
        }

        let selectedCountryObj = filteredCountries[0];
        if (checkAreaCodeExists(filteredCountries)) {
          // Obtains the filtered array of countries with 'key' areaCodes
          const filteredCountryArr = countryArr.filter(
            (countryObj) => 'areaCodes' in countryObj,
          );

          // If it is not equal to [] (there is a country with a area code)
          // Else, we pick the first one (Line 246)
          // ** CHANGE TO .LENGTH
          if (filteredCountryArr !== []) {
            // Then, we check if the area code in the numberStr matches one of the
            // area codes in the list
            // If not, then we pick first one (Line 246)
            if (
              retrieveACfromCountry(filteredCountryArr, numberStr).length !== 0
            ) {
              selectedCountryObj = retrieveACfromCountry(
                filteredCountryArr,
                numberStr,
              )[0];

              const countryIndex = countries.findIndex(
                (countryObj) =>
                  countryObj.countryName === selectedCountryObj.countryName,
              );

              setSelectedCountry(countries[countryIndex].countryName);
              setSelectedCountryCode(countries[countryIndex].countryCode);
            }
          }
        }

        // Selected Country, Number of Digits
        const countryMaxDigits = selectedCountryObj.displayFormat.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        );

        // If the length of the string is greater than the sum of selectedCountry's countryCode and maxDigits, return it with no formatting
        if (
          numberStr.length >
          selectedCountryObj.countryCode.length + countryMaxDigits
        ) {
          return numberStr;
        }

        /* This section deals with formatting */
        let regexCaptureGroups = `([+]\\d{${
          selectedCountryObj.countryCode.length - 1
        }})`;
        selectedCountryObj.displayFormat.forEach((currentValue) => {
          regexCaptureGroups = regexCaptureGroups.concat(
            `(\\d{0,${currentValue}})`,
          );
        });

        const regexExp = new RegExp(`^${regexCaptureGroups}$`);

        let formattedPhoneNum = numberStr.match(regexExp);
        formattedPhoneNum = formattedPhoneNum
          .slice(1, 1 + selectedCountryObj.displayFormat.length + 1)
          .filter(Boolean)
          .join(' ');

        return formattedPhoneNum;
      }
    },
    [countries, extractNumberFormat],
  );

  return (
    <TextField
      label={optional ? `${labelName} (optional)` : labelName}
      type="tel"
      placeholder={placeholder}
      value={formattedPhoneNumber}
      onChange={handleTextChange}
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
  );
}
