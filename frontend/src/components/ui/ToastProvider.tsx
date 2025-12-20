import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#1f2937',
                    color: '#8f6e6eff',
                    border: '1px solid #374151',
                },
            }}
        />
    );
};

export default ToastProvider;