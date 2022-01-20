import { SortOrder } from "../../util/SortOrder";

export type CountryOrderByInput = {
  countryname?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  iso2?: SortOrder;
  updatedAt?: SortOrder;
};
