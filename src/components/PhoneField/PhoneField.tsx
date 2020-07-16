import React, {useState, useEffect, useRef, useCallback} from 'react';

import {TextField} from '../TextField';
import {Button} from '../Button';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {InlineError} from '../InlineError';

import styles from './PhoneField.scss';

export interface Country {
  /** The country flag */
  image: string;
  /** Country name */
  countryName: string;
  /** Country area code */
  countryCode: string;
  /** Phone number display format */
  displayFormat: number[];
  /** Possible area codes for a country. Used to distinguish between countries with same country codes */
  areaCodes?: (number)[];
  countryAlphaCode?: string;
  formatter?(): void;
  population?: number;
}

export interface CountryWithAreaCode {
  /** The country flag */
  image: string;
  /** Country name */
  countryName: string;
  /** Country area code */
  countryCode: string;
  /** Phone number display format */
  displayFormat: number[];
  /** Possible area codes for a country. Used to distinguish between countries with same country codes */
  areaCodes: number[];
  countryAlphaCode?: string;
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
  /** The search bar in the dropdown is present */
  searchBar?: boolean;
  /** Validator for phone number */
  validator?(number: string, country: Country): boolean;
}

export function PhoneField({
  errorMessage,
  placeholder,
  labelName,
  labelHidden,
  optional,
  countries,
  validator,
  searchBar,
}: PhoneFieldProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [popoverActive, setPopoverActive] = useState(countries.length > 1);
  const [selectedCountryObject, setSelectedCountryObject] = useState(
    countries[0],
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

  /* Checks if there is at least one country with 'area code object' */
  function checkAreaCodeKeyExists(countryArr: Country[]) {
    const filteredCountryArr = countryArr.filter(
      (countryObj) => 'areaCodes' in countryObj,
    );

    return filteredCountryArr.length !== 0;
  }

  // Given a countryArr, where the countryCodes are the same, and we are retrieving the area codes
  function retrieveAreaCodeMatches(countryArr: Country[], phoneNum: string) {
    // If we have pass in '+120255, we obtain '202'
    // If we have pass in '+120', we obtain '20'
    // If we have pass in '+1202', we obtain '202'
    console.log('This is the country array being passed in');
    console.log(countryArr);
    const retrieveAreaCodeFromPhoneNum =
      countryArr[0].countryCode.length + countryArr[0].displayFormat[0] <=
      phoneNum.length
        ? phoneNum.slice(
            countryArr[0].countryCode.length,
            countryArr[0].countryCode.length + countryArr[0].displayFormat[0],
          )
        : phoneNum.slice(countryArr[0].countryCode.length);

    const filteredCountryArr = countryArr.filter((countryObj) =>
      // We always check the array has an 'area code' key in the function that calls this
      countryObj.areaCodes?.includes(
        parseInt(retrieveAreaCodeFromPhoneNum, 10),
      ),
    );

    return filteredCountryArr;
  }

  const extractNumberFormat = useCallback((numberStr: string) => {
    const extractNumbersRegex = /\d+/g;
    const numberPresent = extractNumbersRegex.test(numberStr);
    const startsWithPlus = numberStr.startsWith('+') ? '+' : '';

    /* Since the match function may return 'null', the test function was used to check if there is a match first
    before using the match function */

    return numberPresent
      ? `+${numberStr.match(extractNumbersRegex)?.join('')}`
      : startsWithPlus;
  }, []);

  const retrieveCountryObject = useCallback(
    (countryName: string) => {
      const foundIndex = countries.findIndex(
        (element) => element.countryName === countryName,
      );
      return foundIndex;
    },
    [countries],
  );

  const phoneNumberFormatter = useCallback(
    (countryArr: Country[], phoneNumber) => {
      let numberStr = extractNumberFormat(phoneNumber);
      setPhoneNumber(numberStr);

      // Filter the countries based on country code
      const filteredCountries = countryArr.filter((countryObj) =>
        numberStr.startsWith(countryObj.countryCode),
      );

      // If there are no countries that match based off of countryCode, then no formatting
      if (filteredCountries.length === 0) return numberStr;

      // Selected Country Object (default)
      let selectedCountryObj = filteredCountries[0];

      if (filteredCountries.length === 1) {
        setSelectedCountryObject(
          countries[retrieveCountryObject(selectedCountryObj.countryName)],
        );
      }

      if (filteredCountries.length > 1) {
        // So, we don't pass in '+1', no need to filter (any country with just countryCode)
        if (numberStr === filteredCountries[0].countryCode) return numberStr;

        if (checkAreaCodeKeyExists(filteredCountries)) {
          // Obtains the filtered array of countries with 'key' areaCodes
          const filteredCountryArr = countryArr.filter(
            (countryObj) => 'areaCodes' in countryObj,
          );

          // If it is not equal to [] (there is a country with a area code)
          // Else, we pick the first one (Line 246)
          if (filteredCountryArr.length > 0) {
            // Then, we check if the area code in the numberStr matches one of the
            // area codes in the list
            // If not, then we pick first one (Line 246)
            if (
              retrieveAreaCodeMatches(filteredCountryArr, numberStr).length !==
              0
            ) {
              selectedCountryObj = retrieveAreaCodeMatches(
                filteredCountryArr,
                numberStr,
              )[0];

              // console.log(maxCountryPopulationObj(countriesV2));
            }
            setSelectedCountryObject(
              countries[retrieveCountryObject(selectedCountryObj.countryName)],
            );
          }
        }
      }

      // setValidPhoneNumber(checkValidPhoneNumber(numberStr, selectedCountryObj));
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

      // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
      const formattedPhoneNum = numberStr.match(regexExp);

      if (formattedPhoneNum !== null) {
        numberStr = formattedPhoneNum
          .slice(1, 1 + selectedCountryObj.displayFormat.length + 1)
          .filter(Boolean)
          .join(' ');
      }

      return numberStr;
    },
    [countries, extractNumberFormat, retrieveCountryObject],
  );

  /** Callback function for handling when the text in the phone number changes */
  const handleTextChange = useCallback(
    (newValue) =>
      setFormattedPhoneNumber(phoneNumberFormatter(countries, newValue)),
    [countries, phoneNumberFormatter],
  );

  /** Callback function for handling the selected country */
  const handleSelected = useCallback(
    (index) => {
      setSelectedCountryObject(countries[index]);
      handleTextChange(countries[index].countryCode);
      togglePopoverActive();
    },
    [countries, handleTextChange, togglePopoverActive],
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
            handleSelected(retrieveCountryObject(countryName));
          },
        }));

      return results;
    },
    [countries, handleSelected, retrieveCountryObject],
  );

  /** Callback function for handling when the text in search bar changes */
  const handleSearchBar = useCallback(
    (country) => {
      setSearchBarText(country);
      setCountryOptions(retrieveCountries(country));
    },
    [retrieveCountries],
  );

  useEffect(() => {
    if (!validator) return;
    setValidPhoneNumber(validator(phoneNumber, selectedCountryObject));
  }, [phoneNumber, selectedCountryObject, validator]);

  /** Handles the button that clicks for the popover */
  const activator =
    countries.length > 1 ? (
      // eslint-disable-next-line shopify/jsx-no-hardcoded-content
      <Button onClick={togglePopoverActive} disclosure>
        {`${selectedCountryObject.countryName} (${selectedCountryObject.countryCode})`}
      </Button>
    ) : (
      <Button>{selectedCountryObject.countryName}</Button>
    );

  const displayErrorMessage = validPhoneNumber ? null : (
    <InlineError
      message={
        errorMessage ? errorMessage : 'Please enter a valid phone number'
      }
      fieldID="myFieldID"
    />
  );

  const searchBarField = (
    <div className={styles.Searchbar}>
      <TextField
        label="Store name"
        value={searchBarText}
        labelHidden
        placeholder="Search for a country"
        onChange={handleSearchBar}
      />
    </div>
  );

  const maxCountryPopulationObj = useCallback((countryArr: Country[]) => {
    const filteredObj = countryArr.filter(
      (countryObj) => 'population' in countryObj,
    );

    if (filteredObj.length > 0) {
      let selectedCountryObj = filteredObj[0];

      filteredObj.forEach((filteredObj) => {
        if (filteredObj.population && selectedCountryObj.population) {
          if (filteredObj.population && selectedCountryObj.population)
            selectedCountryObj = filteredObj;
        }
      });

      return selectedCountryObj;
    }

    return countryArr[0];
  }, []);

  const countriesV2: Country[] = [
    {
      image: '🇺🇸',
      countryName: 'UK',
      countryCode: '+44',
      displayFormat: [3, 3, 4],
      areaCodes: [201, 202, 408, 409, 412],
      population: 53333233,
    },
    {
      image: '🇨🇦',
      countryName: 'Guernesey',
      countryCode: '+44',
      displayFormat: [3, 3, 4],
      areaCodes: [403, 579, 604, 613, 867],
      population: 5333323,
    },
    {
      image: '🇨🇦',
      countryName: 'Isle of Man',
      countryCode: '+44',
      displayFormat: [3, 3, 4],
      areaCodes: [403, 579, 604, 613, 867],
      population: 23332,
    },
    {
      image: '🇮🇳',
      countryName: 'Hope Island',
      countryCode: '+44',
      displayFormat: [5, 5],
      population: 53,
    },
  ];

  return (
    <div>
      <TextField
        label={optional ? `${labelName} (optional)` : labelName}
        autoComplete="tel"
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
            {searchBar ? searchBarField : null}

            <ActionList items={countryOptions} />
          </Popover>
        }
      />
      {displayErrorMessage}
    </div>
  );
}
