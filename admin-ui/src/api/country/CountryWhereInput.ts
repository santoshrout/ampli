import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";

export type CountryWhereInput = {
  countryname?: StringNullableFilter;
  id?: StringFilter;
  iso2?: BooleanNullableFilter;
};
