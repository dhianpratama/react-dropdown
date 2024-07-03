export type OptionProps = {
    label: string,
    value: any
}

export type DropdownProps = {
  options: Array<OptionProps>;
  isMulti?: boolean;
  searchable?: boolean;
  renderOption?: (option: OptionProps) => React.ReactNode;
  onChange?: (selected: Array<OptionProps> | OptionProps | null) => void;
  usePortal?: boolean;
  searchFilter?: (option: OptionProps, search: string) => boolean;
  zIndex?: number;
  className?: string;
}