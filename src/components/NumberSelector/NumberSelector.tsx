import React, { useState } from 'react';
import { Select, NumberInput, Stack, ComboboxItem } from '@mantine/core';
import classes from './NumberSelector.module.css';

interface Option {
  value: string;
  label: string;
}

interface NumberSelectorProps {
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  presetOptions?: Option[];
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
  onChange,
  minValue = 1,
  maxValue,
  presetOptions = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
  ]
}) => {
  const [value, setValue] = useState<string>('');
  const [customMode, setCustomMode] = useState<boolean>(false);

  const allOptions: Option[] = [
    ...presetOptions,
    { value: 'custom', label: 'Custom...' }
  ];

  const handleSelectChange = (selectedValue: string | null): void => {
    if (!selectedValue) return;

    if (selectedValue === 'custom') {
      setCustomMode(true);
      setValue('');
    } else {
      setCustomMode(false);
      setValue(selectedValue);
      onChange(Number(selectedValue));
    }
  };

  const handleNumberInputChange = (newValue: number | string): void => {
    const numberValue = Number(newValue);
    if (!isNaN(numberValue)) {
      setValue(String(numberValue));
      onChange(numberValue);
    }
  };

  const CloseButton = (
    <div 
      className={classes.closeButton}
      onClick={() => setCustomMode(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setCustomMode(false);
        }
      }}
    >
      ×
    </div>
  );

  const handleOptionSubmit = (val: string) => {
    const numberValue = Number(val);
    if (!isNaN(numberValue) && val.trim() !== '') {
      setCustomMode(true);
      setValue(val);
      onChange(numberValue);
    }
  };

  return (
    <Stack gap="xs">
      {!customMode ? (
        <Select
          data={allOptions}
          value={value}
          onChange={handleSelectChange}
          placeholder="Select or enter a number"
          searchable
          allowDeselect={false}
          onOptionSubmit={handleOptionSubmit}
          comboboxProps={{ withinPortal: false }}
        />
      ) : (
        <NumberInput
          value={value === '' ? '' : Number(value)}
          onChange={handleNumberInputChange}
          placeholder="Enter a custom number"
          min={minValue}
          max={maxValue}
          rightSection={CloseButton}
          allowNegative={false}
          allowDecimal={true}
          hideControls
        />
      )}
    </Stack>
  );
};

export default NumberSelector;