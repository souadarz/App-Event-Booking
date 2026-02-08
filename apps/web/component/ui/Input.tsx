import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#52796f] mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none text-[#2f3e46] ${
          error
            ? 'border-red-300 focus:border-red-500'
            : 'border-[#cad2c5] focus:border-[#84a98c]'
        }`}
        {...props}
      />
      {helperText && !error && (
        <p className="text-xs text-[#52796f] mt-1">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}