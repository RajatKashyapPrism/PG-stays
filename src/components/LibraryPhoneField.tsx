import { useEffect, useRef, useState } from 'react';
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
  name?: string;
  defaultCountryCode?: string;
  lockCountryCode?: boolean;
}

export default function LibraryPhoneField({
  label = 'Mobile number',
  placeholder,
  description,
  errorMessage = 'Please enter a mobile number.',
  isDisabled,
  isRequired,
  isReadOnly,
  isInvalid: isInvalidProp,
  name,
  defaultCountryCode = 'IN',
  lockCountryCode = true,
}: Props) {
  const hiddenRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showError, setShowError] = useState(false);

  const isInvalid = isInvalidProp || showError;

  useEffect(() => {
    const countrySelect = wrapperRef.current?.querySelector('select');
    if (!countrySelect) return;

    if (countrySelect.value !== defaultCountryCode) {
      countrySelect.value = defaultCountryCode;
      countrySelect.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (lockCountryCode) {
      countrySelect.disabled = true;
      countrySelect.tabIndex = -1;
      countrySelect.setAttribute('aria-disabled', 'true');
      countrySelect.style.opacity = '1';
      countrySelect.style.cursor = 'default';
      return;
    }

    countrySelect.disabled = false;
    countrySelect.removeAttribute('aria-disabled');
    countrySelect.removeAttribute('tabindex');
    countrySelect.style.opacity = '';
    countrySelect.style.cursor = '';
  }, [defaultCountryCode, lockCountryCode]);

  return (
    <>
    <style>{`
      .phone-field-wrapper > * {
        width: 100%;
      }
      .phone-field-invalid label {
        color: var(--colour-text-intense-negative);
      }
      .phone-field-country-locked select {
        pointer-events: none;
      }
      .phone-field-country-locked [class*="countryChevron"] {
        display: none;
      }
    `}</style>
    <div
      ref={wrapperRef}
      className={`phone-field-wrapper${isInvalid ? ' phone-field-invalid' : ''}${lockCountryCode ? ' phone-field-country-locked' : ''}`}
      style={{ width: '100%', position: 'relative' }}
      onInput={(e) => {
        const v = (e.target as HTMLInputElement).value ?? '';
        if (hiddenRef.current) hiddenRef.current.value = v;
        if (v.trim() !== '') setShowError(false);
      }}
    >
      <PhoneField
        label={label}
        placeholder={placeholder}
        description={description}
        errorMessage={isInvalid ? errorMessage : undefined}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        isInvalid={isInvalid}
      />
      {name && (
        <input
          ref={hiddenRef}
          name={name}
          required={isRequired}
          tabIndex={-1}
          aria-hidden="true"
          onInvalid={(e) => {
            e.preventDefault(); // suppress browser native tooltip
            setShowError(true);
          }}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            width: '1px',
            height: '1px',
            top: 0,
            left: 0,
          }}
        />
      )}
    </div>
    </>
  );
}
