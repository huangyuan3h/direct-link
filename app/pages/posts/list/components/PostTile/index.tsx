import { PostType } from '../../../types';
import Image from 'next/image';

export interface PostTileProps extends PostType {}

const noImageURL = 'noImageURL';

const getCovderImage = (images?: string[]): string => {
  if (!images || images.length === 0) return noImageURL;

  return images[0];
};

export const PostTile: React.FC<PostTileProps> = ({
  subject,
  images,
}: PostTileProps) => {
  const coverImage = getCovderImage(images);
  return (
    <div>
      <div>
        <Image src={images[0]} alt={subject} />
      </div>

      <div>{subject}</div>
    </div>
  );
};
