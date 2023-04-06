import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';

interface CheckBoxPropsType {
  values: string[];
  onChangeHandler: (index: number) => () => void;
  size: string;
}

function CheckBox({ values, onChangeHandler, size }: CheckBoxPropsType) {
  return (
    <CheckboxGroup colorScheme="green" defaultValue={values}>
      <Stack spacing={[1, 5]} direction={'row'}>
        {values.map((value, index) => (
          <Checkbox
            onChange={onChangeHandler(index)}
            key={`checkbox-${value}`}
            value={value}
            size={size}
          >
            {value}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
}
export default CheckBox;
