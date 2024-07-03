import { expect } from '@storybook/jest';
import { StoryObj, Meta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Dropdown from '../index';

const meta =  {
  title: 'Components/Dropdown',
  component: Dropdown,
} as Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
    args: {
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ],
        isMulti: false,
        searchable: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdown = canvas.getByRole('combobox');
        
        // Open dropdown
        await userEvent.click(dropdown);
      
        // Select the first option
        const firstOption = canvas.getByText('Option 1');
        await userEvent.click(firstOption);
      
        // Check if the option is selected
        expect(dropdown).toHaveTextContent('Option 1');
    }
};
