interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AppCard(props: IProps) {
  return (
    <div {...props} className={`app-card ${props.className}`}>
      {props.children}
    </div>
  );
}
