'use client';

import {
  FileX,
  Search,
  Database,
  Inbox,
  ShoppingCart,
  Users,
  MessageSquare,
  Image,
  RefreshCw,
  Plus,
} from 'lucide-react';
import React, { useState } from 'react';

type NoDataVariant =
  | 'default'
  | 'search'
  | 'database'
  | 'inbox'
  | 'cart'
  | 'users'
  | 'messages'
  | 'images'
  | 'files';

interface Action {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

interface NoDataProps {
  variant?: NoDataVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: Action[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showRefresh?: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const getVariantConfig = (variant: NoDataVariant) => {
  const configs = {
    default: {
      icon: <FileX className="w-16 h-16 text-gray-400" />,
      title: 'No Data Available',
      description: 'There is no data to display at the moment.',
    },
    search: {
      icon: <Search className="w-16 h-16 text-gray-400" />,
      title: 'No Results Found',
      description: 'Try adjusting your search criteria or check your spelling.',
    },
    database: {
      icon: <Database className="w-16 h-16 text-gray-400" />,
      title: 'No Records Found',
      description: 'The database query returned no results.',
    },
    inbox: {
      icon: <Inbox className="w-16 h-16 text-gray-400" />,
      title: 'Inbox is Empty',
      description: 'You have no new messages or notifications.',
    },
    cart: {
      icon: <ShoppingCart className="w-16 h-16 text-gray-400" />,
      title: 'Cart is Empty',
      description: 'Add some items to your cart to get started.',
    },
    users: {
      icon: <Users className="w-16 h-16 text-gray-400" />,
      title: 'No Users Found',
      description: 'There are no users matching your criteria.',
    },
    messages: {
      icon: <MessageSquare className="w-16 h-16 text-gray-400" />,
      title: 'No Messages',
      description: 'Start a conversation to see messages here.',
    },
    images: {
      icon: <Image className="w-16 h-16 text-gray-400" />,
      title: 'No Images',
      description: 'Upload some images to get started.',
    },
    files: {
      icon: <FileX className="w-16 h-16 text-gray-400" />,
      title: 'No Files',
      description: 'Upload or create files to see them here.',
    },
  };

  return configs[variant] || configs.default;
};

const getSizeConfig = (size: 'sm' | 'md' | 'lg') => {
  const configs = {
    sm: {
      container: 'py-8 px-4',
      iconSize: 'w-12 h-12',
      titleSize: 'text-lg',
      descriptionSize: 'text-sm',
      buttonSize: 'px-3 py-1.5 text-sm',
    },
    md: {
      container: 'py-12 px-6',
      iconSize: 'w-16 h-16',
      titleSize: 'text-xl',
      descriptionSize: 'text-base',
      buttonSize: 'px-4 py-2 text-sm',
    },
    lg: {
      container: 'py-16 px-8',
      iconSize: 'w-20 h-20',
      titleSize: 'text-2xl',
      descriptionSize: 'text-lg',
      buttonSize: 'px-6 py-3 text-base',
    },
  };

  return configs[size] || configs.md;
};

const NoDataShared: React.FC<NoDataProps> = ({
  variant = 'default',
  title,
  description,
  icon,
  actions = [],
  className = '',
  size = 'md',
  showRefresh = false,
  onRefresh,
  isLoading = false,
}) => {
  const variantConfig = getVariantConfig(variant);
  const sizeConfig = getSizeConfig(size);

  const displayTitle = title || variantConfig.title;
  const displayDescription = description || variantConfig.description;
  const displayIcon =
    icon ||
    React.cloneElement(variantConfig.icon, {
      className: `${sizeConfig.iconSize} text-gray-400`,
    });

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${sizeConfig.container} ${className}`}
    >
      <div className="mb-4">
        {isLoading ? (
          <RefreshCw className={`${sizeConfig.iconSize} text-gray-400 animate-spin`} />
        ) : (
          displayIcon
        )}
      </div>

      <h3 className={`font-semibold text-gray-700 mb-2 ${sizeConfig.titleSize}`}>
        {isLoading ? 'Loading...' : displayTitle}
      </h3>

      <p className={`text-gray-500 mb-6 max-w-md ${sizeConfig.descriptionSize}`}>
        {isLoading ? 'Please wait while we fetch your data.' : displayDescription}
      </p>

      {!isLoading && (actions.length > 0 || showRefresh) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {showRefresh && onRefresh && (
            <button
              onClick={onRefresh}
              className={`inline-flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${sizeConfig.buttonSize}`}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          )}

          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-200 ${sizeConfig.buttonSize} ${
                action.variant === 'primary'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const NoDataExamples: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleAddItem = () => {
    alert('Add item clicked!');
  };

  const handleSearch = () => {
    alert('New search clicked!');
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        No Data Component Examples
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Default</h3>
          </div>
          <NoDataShared
            variant="default"
            showRefresh
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Search Results</h3>
          </div>
          <NoDataShared
            variant="search"
            actions={[
              {
                label: 'New Search',
                onClick: handleSearch,
                variant: 'primary',
                icon: <Search className="w-4 h-4" />,
              },
            ]}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Shopping Cart</h3>
          </div>
          <NoDataShared
            variant="cart"
            actions={[
              {
                label: 'Start Shopping',
                onClick: handleAddItem,
                variant: 'primary',
                icon: <Plus className="w-4 h-4" />,
              },
            ]}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Users List</h3>
          </div>
          <NoDataShared
            variant="users"
            size="sm"
            actions={[
              {
                label: 'Invite Users',
                onClick: handleAddItem,
                variant: 'primary',
              },
            ]}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Messages</h3>
          </div>
          <NoDataShared variant="messages" size="sm" />
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Custom</h3>
          </div>
          <NoDataShared
            title="Custom Title"
            description="This is a custom no data component with custom text and actions."
            icon={<Database className="w-16 h-16 text-purple-400" />}
            actions={[
              {
                label: 'Custom Action',
                onClick: handleAddItem,
                variant: 'primary',
              },
              {
                label: 'Secondary',
                onClick: handleSearch,
                variant: 'secondary',
              },
            ]}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Large Size Example</h3>
        </div>
        <NoDataShared
          variant="inbox"
          size="lg"
          actions={[
            {
              label: 'Check Again',
              onClick: handleRefresh,
              variant: 'primary',
              icon: <RefreshCw className="w-4 h-4" />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default NoDataExamples;
