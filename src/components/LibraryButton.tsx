import { Button } from '@prism-design-global/components';

interface Props {
  label: string;
  href?: string;
  scrollTarget?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'hyperlink' | 'underlined';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function LibraryButton({
  label,
  href,
  scrollTarget,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
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
    <Button
      variant={variant}
      size={size}
      type={type}
      onPress={href || scrollTarget ? handlePress : undefined}
      style={fullWidth ? { width: '100%' } : undefined}
    >
      {label}
    </Button>
  );
}
