interface IProps extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export function AppForm(props: IProps) {
  return (
    <form {...props} className={`app-form ${props.className}`}>
      {props.children}
    </form>
  );
}
