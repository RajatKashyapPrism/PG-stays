import { TextField } from '@prism-design-global/components';

interface Props {
  label: string;
  description?: string;
  errorMessage?: string;
  name?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export default function LibraryTextField({
  label,
  description,
  errorMessage,
  name,
  type,
  autoComplete,
  inputMode,
  isRequired,
  placeholder,
}: Props) {
  return (
    <TextField
      label={label}
      description={description}
      errorMessage={errorMessage}
      name={name}
      type={type}
      autoComplete={autoComplete}
      inputMode={inputMode}
      isRequired={isRequired}
      placeholder={placeholder}
      style={{ width: '100%' }}
    />
  );
}
