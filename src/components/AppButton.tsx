interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AppButton(props: IProps) {
  return (
    <button {...props} className={`app-button ${props.className}`}>
      {props.children}
    </button>
  );
}
