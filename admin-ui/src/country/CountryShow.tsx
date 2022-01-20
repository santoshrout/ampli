import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";

export const CountryShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="countryname" source="countryname" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <BooleanField label="iso2" source="iso2" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
