import { PhoneField } from '@prism-design-global/components';

interface Props {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
}

export default function LibraryPhoneField(props: Props) {
  return (
    <div className="phone-field-full-width" style={{ width: '100%' }}>
      <PhoneField {...props} />
    </div>
  );
}
