import { Labeled } from './layout/Layout';

interface InputType {
  value: string | number;
  placeholder: string;
  onChange: (test: string) => void;
  required?: boolean;
  disabled?: boolean;
  property?: Record<string, string | number | boolean>;
  styles?: string;
}
export default function Input({
  value,
  placeholder,
  onChange,
  required,
  disabled,
  property,
  styles,
}: InputType) {
  return (
    <input
      className={`${styles ?? ''} input-primary`}
      value={value}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      }}
      required={required}
      disabled={disabled}
      {...property}
    />
  );
}

interface LabeledInputType extends InputType {
  label: string;
}
export const LabeledInput = ({ label, ...inputProps }: LabeledInputType) => {
  return (
    <Labeled label={label}>
      <Input {...inputProps} />
    </Labeled>
  );
};
