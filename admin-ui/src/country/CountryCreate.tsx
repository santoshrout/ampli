import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  BooleanInput,
} from "react-admin";

export const CountryCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="countryname" source="countryname" />
        <BooleanInput label="iso2" source="iso2" />
      </SimpleForm>
    </Create>
  );
};
