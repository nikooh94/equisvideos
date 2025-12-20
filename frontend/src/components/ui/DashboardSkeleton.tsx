import React from 'react';

const DashboardSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header skeleton */}
            <div className="mb-8">
                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Search bar skeleton */}
            <div className="mb-8">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse max-w-md"></div>
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm p-4 animate-pulse"
                    >
                        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded-lg mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded-lg mb-1 w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardSkeleton;