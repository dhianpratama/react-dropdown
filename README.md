# Dropdown Component

A flexible dropdown component for React applications, supporting single or multi-select, search functionality, customizable option rendering, and more.

## Features

- **Single or Multi-Select:** Supports both single and multi-selection of options.
- **Searchable Dropdown:** Includes a search feature to filter options.
- **Customizable Option Rendering:** Allows customization of how options are displayed.
- **Portal Support:** Option to render dropdown options using a portal for better styling and z-index management.
- **Styling:** Uses Tailwind CSS for styling or allows custom classNames.
- **Z-Index Compatibility:** Ensures compatibility with elements having a z-index greater than 1000.
- **Storybook Integration:** Integrated with Storybook for easy testing and development.

## Installation

To install the `Dropdown` component, use npm or yarn:

```bash
npm install @your-package/dropdown
# or
yarn add @your-package/dropdown
```

## Usage

### Basic Example

```
import React, { useState } from 'react';
import Dropdown from '@your-package/dropdown';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const MyComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    console.log('Selected:', selected);
  };

  return (
    <Dropdown
      options={options}
      onChange={handleChange}
      isMulti={false}
      searchable={true}
    />
  );
};

export default MyComponent;
```

### Props
| Prop           | Description                                                                     | Default     |
|----------------|---------------------------------------------------------------------------------|-------------|
| `options`      | Array of options with `label` and `value` properties.                           | `[]`        |
| `onChange`     | Callback function triggered on selection change.                                | `undefined` |
| `isMulti`      | Enables multi-select mode.                                                      | `false`     |
| `searchable`   | Enables search functionality within the dropdown.                               | `false`     |
| `renderOption` | Custom function to render each option.                                          | `undefined` |
| `usePortal`    | Renders dropdown options in a portal for better styling and z-index control.    | `false`     |
| `searchFilter` | Custom function for filtering options based on search input.                    | `undefined` |
| `zIndex`       | Z-index value for dropdown styling.                                             | `1000`      |
| `className`    | Custom class name for additional styling.                                       | `''`        |

## Development

### Setting Up Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/dropdown-component.git
    ```
2. Install dependencies:
    ```bash
    cd dropdown-component
    npm install
    ```
3. Start storybook:
    ```
    npm run storybook
    ```
    Open your browser to http://localhost:6006 to view the stories.
