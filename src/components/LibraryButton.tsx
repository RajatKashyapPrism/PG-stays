import { Button } from '@prism-design-global/components';

interface Props {
  label: string;
  href?: string;
  scrollTarget?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'hyperlink' | 'underlined';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function LibraryButton({
  label,
  href,
  scrollTarget,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  isDisabled = false,
  type = 'button',
}: Props) {
  const handlePress = () => {
    if (scrollTarget) {
      const target = document.getElementById(scrollTarget);
      if (target) {
        const navbarHeight = document.querySelector<HTMLElement>('.navbar')?.offsetHeight ?? 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
        const startTop = window.scrollY;
        const distance = targetTop - startTop;

        if (Math.abs(distance) < 4) return;

        const duration = 560;
        const startTime = performance.now();
        const easeOutQuart = (progress: number) => 1 - Math.pow(1 - progress, 4);

        const step = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutQuart(progress);

          window.scrollTo({ top: startTop + distance * easedProgress });

          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
        return;
      }
    }

    if (href) {
      window.location.href = href;
    }
  };

  return (
    <>
      <style>{`
        [data-library-button] {
          transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        }
        [data-library-button][data-button-variant="primary"][data-hovered] {
          background-color: var(--colour-interaction-background-intense-brand-primary-hover) !important;
        }
        [data-library-button][data-button-variant="primary"][data-pressed] {
          background-color: var(--colour-interaction-background-intense-brand-primary-pressed) !important;
        }
        [data-library-button][data-button-variant="secondary"][data-hovered] {
          background-color: var(--colour-interaction-background-intense-brand-secondary-hover) !important;
        }
        [data-library-button][data-button-variant="secondary"][data-pressed] {
          background-color: var(--colour-interaction-background-intense-brand-secondary-pressed) !important;
        }
        [data-library-button][data-button-variant="tertiary"][data-hovered] {
          box-shadow: inset 0 0 0 var(--button-size-interaction-border-width-hover) var(--colour-border-intense-brand-secondary) !important;
        }
        [data-library-button][data-button-variant="tertiary"][data-pressed] {
          box-shadow: inset 0 0 0 var(--button-size-interaction-border-width-pressed) var(--colour-border-intense-brand-secondary) !important;
        }
        [data-library-button][data-button-variant="hyperlink"][data-hovered] {
          color: var(--hyperlink-colour-interaction-hover) !important;
          text-decoration-line: underline;
          text-decoration-style: dotted;
          text-decoration-color: currentColor;
          text-decoration-skip-ink: none;
        }
        [data-library-button][data-button-variant="hyperlink"][data-pressed] {
          color: var(--hyperlink-colour-active) !important;
          text-decoration-line: underline;
          text-decoration-style: dotted;
          text-decoration-color: currentColor;
          text-decoration-skip-ink: none;
        }
        [data-library-button][data-button-variant="underlined"][data-hovered]::before,
        [data-library-button][data-button-variant="underlined"][data-pressed]::before,
        [data-library-button][data-button-variant="hyperlink"][data-hovered]::before,
        [data-library-button][data-button-variant="hyperlink"][data-pressed]::before {
          content: "";
          position: absolute;
          inset: 0 -8px;
          border-radius: var(--size-border-radius-md);
          z-index: -1;
        }
        [data-library-button][data-button-variant="hyperlink"][data-hovered]::before,
        [data-library-button][data-button-variant="hyperlink"][data-pressed]::before {
          background-color: var(--colour-background-subtle-info);
        }
        [data-library-button][data-button-variant="underlined"][data-hovered] {
          text-decoration-line: underline;
          text-decoration-color: currentColor;
          text-decoration-skip-ink: none;
        }
        [data-library-button][data-button-variant="underlined"][data-hovered]::before {
          background-color: var(--colour-interaction-background-subtle-neutral-1-hover);
        }
        [data-library-button][data-button-variant="underlined"][data-pressed]::before {
          background-color: var(--colour-interaction-background-subtle-neutral-1-pressed);
        }
        [data-library-button][data-focus-visible] {
          outline: 2px solid var(--colour-border-intense-brand-primary);
          outline-offset: 2px;
        }
        [data-library-button][data-disabled] {
          background-color: var(--colour-background-subtle-neutral-3) !important;
          color: var(--colour-text-subtle-neutral) !important;
          cursor: not-allowed;
        }
        [data-library-button][data-button-variant="tertiary"][data-disabled] {
          background-color: transparent !important;
          box-shadow: inset 0 0 0 var(--button-size-border-width-active) var(--colour-border-subtle-neutral) !important;
        }
        [data-library-button][data-button-variant="hyperlink"][data-disabled],
        [data-library-button][data-button-variant="underlined"][data-disabled] {
          background-color: transparent !important;
        }
      `}</style>
      <Button
        data-library-button
        data-button-variant={variant}
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        type={type}
        onPress={href || scrollTarget ? handlePress : undefined}
        style={fullWidth ? { width: '100%' } : undefined}
      >
        {label}
      </Button>
    </>
  );
}
