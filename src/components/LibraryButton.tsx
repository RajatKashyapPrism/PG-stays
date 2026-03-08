import { Button } from '@prism-design-global/components';

interface Props {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'hyperlink' | 'underlined';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function LibraryButton({ label, href, variant = 'primary', size = 'lg', fullWidth = false }: Props) {
  const handlePress = href ? () => { window.location.href = href; } : undefined;
  return (
    <Button variant={variant} size={size} onPress={handlePress} style={fullWidth ? { width: '100%' } : undefined}>
      {label}
    </Button>
  );
}
