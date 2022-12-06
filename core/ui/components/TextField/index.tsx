import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  Input,
  InputProps,
  Text,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

interface TextFieldBaseProps {
  label: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  helperText?: string;
}

interface TextFieldMultilineProps extends TextareaProps {
  isMultiline: true;
}

interface TextFieldSinglelineProps extends InputProps {
  isMultiline?: false;
}

type TextFieldProps = TextFieldBaseProps &
  (TextFieldMultilineProps | TextFieldSinglelineProps);

export default forwardRef(function TextField(
  {
    label,
    isMultiline,
    isInvalid,
    isRequired,
    helperText,
    ...inputProps
  }: TextFieldProps,
  ref
) {
  const renderInput = () => {
    if (isMultiline)
      return <Textarea ref={ref} {...(inputProps as TextareaProps)} />;
    return <Input ref={ref} {...(inputProps as InputProps)} />;
  };

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>
        {label}
        {!!isRequired && (
          <Text
            color="error"
            ml={1}
            fontWeight="bold"
            title="Obligatoire"
            as="abbr"
          >
            *
          </Text>
        )}
      </FormLabel>
      {renderInput()}
      <FormErrorMessage>{helperText}</FormErrorMessage>
      {!isInvalid && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
