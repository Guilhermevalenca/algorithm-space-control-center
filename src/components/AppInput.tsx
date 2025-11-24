interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AppInput(props: IProps) {
  return (
    <div className="app-input">
      <label>{props.label}</label>
      <input {...props} />
    </div>
  );
}
