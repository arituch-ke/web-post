type Props = { children: React.ReactNode };

const IconWrapper = ({ children }: Props) => (
  <div className="material-symbols-outlined text-2xl text-default-400 pointer-events-none">
    {children}
  </div>
);

export default IconWrapper;
