import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  BooleanInput,
} from "react-admin";

export const CountryEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="countryname" source="countryname" />
        <BooleanInput label="iso2" source="iso2" />
      </SimpleForm>
    </Edit>
  );
};
