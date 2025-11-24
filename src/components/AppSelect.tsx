interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function AppSelect(props: IProps) {
  return <select {...props}>{props.children}</select>;
}
