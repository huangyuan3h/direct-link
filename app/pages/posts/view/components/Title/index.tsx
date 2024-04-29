export interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }: TitleProps) => {
  return <div className="h2 mt-2">{title}</div>;
};
