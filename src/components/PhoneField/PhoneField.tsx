import React, {useState, useEffect, useCallback} from 'react';

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
  /** Country alpha code. Used as  */
  countryAlphaCode?: string;
  /** Phone number display format */
  displayFormat: number[];
  /** Possible area codes for a country. Used to distinguish between countries with same country codes */
  areaCodes?: number[];
  population?: number;
}

export interface PhoneFieldProps {
  /** Textfield label  */
  labelName: string;
  /** Hides the label for accessibility */
  labelHidden?: boolean;
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
  labelName,
  labelHidden,
  errorMessage,
  countries,
  searchBar,
  validator,
}: PhoneFieldProps) {
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [popoverActive, setPopoverActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [searchBarText, setSearchBarText] = useState('');
  const allCountries = countries.map(
    ({countryName, image, countryCode}, index) => ({
      content: `${image}  ${countryName} (${countryCode})`,
      onAction: () => handleSelected(index),
    }),
  );

  // Sets the default country as the country with the most population
  const maxCountryPopulationObj = useCallback((countryArr: Country[]) => {
    const populationCountries = countryArr
      .filter((countryObject) => 'population' in countryObject)
      .sort((countryA: Country, countryB: Country) => {
        if (countryA.population && countryB.population) {
          return countryB.population - countryA.population;
        }
        return 0;
      });

    return populationCountries.length > 1
      ? populationCountries[0]
      : countryArr[0];
  }, []);

  // Selected Country Obbject
  const [selectedCountryObject, setSelectedCountryObject] = useState(
    maxCountryPopulationObj(countries),
  );

  // Formatted phone number
  const [phoneNumber, setPhoneNumber] = useState(
    `${selectedCountryObject.countryCode}`,
  );

  // Country Options for ActionList
  const [countryOptions, setCountryOptions] = useState(allCountries);

  /* This state is used when there are two countries with the same area code,
  and display format (e.g. Russia and Kazakhstan both have '+7'). The formatter
  will automatically assume that Russia is the phone number since it has
  the biggest population. However, the clicked value is set to true if
  the country Kazakhstan is selected in the dropdown, so the phone number entered
  with +7 will be identified as Kazakhstan*/
  const handleClicked = useCallback(
    (bool) => {
      setClicked(bool);
    },
    [setClicked],
  );

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

  // Given a array of country objects, where the country codes are the same, and we are retrieving the area codes
  function retrieveAreaCodeMatches(countryArr: Country[], phoneNum: string) {
    // If we have pass in '+120255', we obtain '202' as the area code
    // If we have pass in '+120', we obtain '20' as the area code
    // If we have pass in '+1202', we obtain '202' as the area code
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

  /* Given a phone number, it will check if there is a plus sign before the phone number
  and insert it if there is not. If a string of just a plus sign or empty string is passed in,
  then we return the plus sign. */
  const addPhoneNumberPrefix = useCallback((phoneNumber: string) => {
    const extractNumbersRegex = /\d+/g;
    const numberPresent = extractNumbersRegex.test(phoneNumber);
    const startsWithPlus = phoneNumber.startsWith('+') ? '+' : '';

    /* Since the match function may return 'null', the test function was used to check if there is a match first
    before using the match function */

    return numberPresent
      ? `+${phoneNumber.match(extractNumbersRegex)?.join('')}`
      : startsWithPlus;
  }, []);

  const retrieveCountryObject = useCallback(
    (countryName: string) => {
      const countryIndex = countries.findIndex(
        (element) => element.countryName === countryName,
      );
      return countryIndex;
    },
    [countries],
  );

  /* This function is responsible for identifying the country flag for a phone number
  and returns the formatted phone number*/
  const identifyPhoneNumberCountry = useCallback(
    (countryArr: Country[], phoneNumber) => {
      const phoneNumberStr = addPhoneNumberPrefix(phoneNumber);

      // Filter the countries based on country code
      const filteredCountries = countryArr.filter((country) =>
        phoneNumberStr.startsWith(country.countryCode),
      );

      // If there are no countries that match based off of countryCode, then no formatting
      if (filteredCountries.length === 0) {
        handleClicked(false);
        return phoneNumberStr;
      }

      // A default country object
      let identifiedCountry = maxCountryPopulationObj(filteredCountries);

      if (filteredCountries.length === 1) {
        setSelectedCountryObject(
          countries[retrieveCountryObject(identifiedCountry.countryName)],
        );
      }

      if (filteredCountries.length > 1) {
        // So, we don't pass in '+1', no need to filter (any country with just countryCode)
        if (phoneNumberStr === filteredCountries[0].countryCode)
          return phoneNumberStr;

        if (checkAreaCodeKeyExists(filteredCountries)) {
          // Obtains the filtered array of countries with 'key' areaCodes
          const filteredCountryArr = countryArr.filter(
            (countryObj) => 'areaCodes' in countryObj,
          );

          // If the filteredCountryArr is greater than 0...
          if (filteredCountryArr.length > 0) {
            // ... Then, we check if the area code in the phoneNumberStr matches one of the area codes in the list
            if (
              retrieveAreaCodeMatches(filteredCountryArr, phoneNumberStr)
                .length !== 0
            ) {
              identifiedCountry = retrieveAreaCodeMatches(
                filteredCountryArr,
                phoneNumberStr,
              )[0];
            }
          }
        }

        /* Deals with the case where if user enters a country code with more than two possible countries */
        if (
          selectedCountryObject.countryCode === identifiedCountry.countryCode &&
          clicked
        ) {
          identifiedCountry = selectedCountryObject;
        }

        setSelectedCountryObject(
          countries[retrieveCountryObject(identifiedCountry.countryName)],
        );
      }

      return phoneNumberStr;
    },
    [
      countries,
      addPhoneNumberPrefix,
      maxCountryPopulationObj,
      retrieveCountryObject,
      handleClicked,
      selectedCountryObject,
      clicked,
    ],
  );

  /** Callback function for handling when the text in the phone number changes */
  const handleTextChange = useCallback(
    (newValue) =>
      setPhoneNumber(identifyPhoneNumberCountry(countries, newValue)),
    [identifyPhoneNumberCountry, countries],
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

  /* Retrieves an array of countries that matched based on what is entered in the dropdown */
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
        label="Search bar"
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
        label={labelName}
        autoComplete="tel"
        type="tel"
        value={phoneNumber}
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
