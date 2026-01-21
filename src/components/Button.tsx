export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const baseClasses = 'font-semibold rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-block text-center';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:shadow-[0_8px_24px_rgba(102,126,234,0.4)]',
    secondary: 'bg-gray-50 text-indigo-600 border-2 border-indigo-600 hover:bg-gray-100',
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-8 py-3.5 text-base',
    large: 'px-10 py-4 text-lg',
  };

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
