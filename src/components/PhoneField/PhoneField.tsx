import React, {useState, useEffect, useRef, useCallback} from 'react';

import {TextField} from '../TextField';
import {Button} from '../Button';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';

import styles from './PhoneField.scss';

export interface Country {
  /** The country flag */
  image: string;
  /** Country name */
  countryName: string;
  /** Country area code */
  countryCode: string;
  countryAlphaCode?: string;
  /** Phone number display format */
  displayFormat: number[];
  /** Possible area codes for a country. Used to distinguish between countries with same country codes */
  areaCodes?: number[];
  population?: number;
  formatter?(): void;
}

export interface PhoneFieldProps {
  /** Placeholder text  */
  placeholder?: string;
  /** Textfield label  */
  labelName?: string;
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
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [popoverActive, setPopoverActive] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Conduct research on which country appears first
  const [searchBarText, setSearchBarText] = useState('');
  const allCountries = countries.map(
    ({countryName, image, countryCode}, index) => ({
      content: `${image}  ${countryName} (${countryCode})`,
      onAction: () => handleSelected(index),
    }),
  );

  const maxCountryPopulationObj = useCallback((countryArr: Country[]) => {
    const filteredObj = countryArr.filter(
      (countryObj) => 'population' in countryObj,
    );

    if (filteredObj.length > 0) {
      let selectedCountryObj = filteredObj[0];

      filteredObj.forEach((filteredObj) => {
        if (filteredObj.population && selectedCountryObj.population) {
          if (filteredObj.population > selectedCountryObj.population)
            selectedCountryObj = filteredObj;
        }
      });

      return selectedCountryObj;
    }

    return countryArr[0];
  }, []);

  const [selectedCountryObject, setSelectedCountryObject] = useState(
    maxCountryPopulationObj(countries),
  );

  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(
    `${selectedCountryObject.countryCode}`,
  );

  const [countryOptions, setCountryOptions] = useState(allCountries);

  const handleClicked = useCallback((bool) => setClicked(bool), [setClicked]);
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
    // console.log('This is the country array being passed in');
    // console.log(countryArr);
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

  /** Callback function for handling when the text in the phone number changes */
  const handleTextChange = useCallback(
    (newValue) => setFormattedPhoneNumber(newValue),
    [],
  );

  /** Callback function for handling the selected country */
  const handleSelected = useCallback(
    (index) => {
      handleClicked(true);
      setSelectedCountryObject(countries[index]);
      handleTextChange(countries[index].countryCode);
      togglePopoverActive();
    },
    [countries, handleTextChange, togglePopoverActive, handleClicked],
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

  const activator = (
    // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
    <Button
      onClick={countries.length > 1 ? togglePopoverActive : () => {}}
      disclosure={countries.length > 1}
    >
      {`${selectedCountryObject.image}`}
    </Button>
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
        error={validPhoneNumber ? undefined : errorMessage}
      />
    </div>
  );
}
