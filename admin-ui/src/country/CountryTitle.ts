import { Country as TCountry } from "../api/country/Country";

export const COUNTRY_TITLE_FIELD = "countryname";

export const CountryTitle = (record: TCountry): string => {
  return record.countryname || record.id;
};
