import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    showText?: boolean;
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'border-blue-500',
    showText = false,
    text = 'Cargando...'
}) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-14 h-14 border-4'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            {/* Spinner */}
            <div
                className={`
          ${sizeClasses[size]}
          ${color}
          rounded-full
          border-solid
          border-t-transparent
          animate-spin
        `}
            />

            {/* Texto opcional */}
            {showText && (
                <p className={`${textSizes[size]} text-gray-600 font-medium`}>
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;