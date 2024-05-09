import Badge from 'react-bootstrap/Badge';

export interface CategoriesProps {
  categories: string[];
}

export const Categories: React.FC<CategoriesProps> = ({
  categories,
}: CategoriesProps) => {
  if (!categories || categories.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {categories.map((c) => {
        return (
          <Badge
            pill
            bg="secondary"
            key={`categories-${c}`}
            className="cursor-pointer"
          >
            {c}
          </Badge>
        );
      })}
    </div>
  );
};
