import { TextField } from '@prism-design-global/components';

interface Props {
  label: string;
  description?: string;
  errorMessage?: string;
}

export default function LibraryTextField({ label, description, errorMessage }: Props) {
  return (
    <TextField
      label={label}
      description={description}
      errorMessage={errorMessage}
      style={{ width: '100%' }}
    />
  );
}
