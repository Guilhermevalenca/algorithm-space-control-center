interface IProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

// type IProps = React.ComponentProps<"option">;

export function AppOption(props: IProps) {
  return <option {...props}>{props.children}</option>;
}
