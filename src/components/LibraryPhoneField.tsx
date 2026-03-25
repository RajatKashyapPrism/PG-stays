import { TextField } from '@prism-design-global/components';

interface Props {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  name?: string;
  autoComplete?: string;
}

export default function LibraryPhoneField({
  label = 'Mobile number',
  placeholder,
  description,
  errorMessage,
  isDisabled,
  isRequired,
  isReadOnly,
  isInvalid,
  name,
  autoComplete,
}: Props) {
  return (
    <div className="phone-field-full-width" style={{ width: '100%' }}>
      <TextField
        label={label}
        placeholder={placeholder}
        description={description}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        isInvalid={isInvalid}
        name={name}
        autoComplete={autoComplete ?? 'tel'}
        type="tel"
        inputMode="tel"
        style={{ width: '100%' }}
      />
    </div>
  );
}
