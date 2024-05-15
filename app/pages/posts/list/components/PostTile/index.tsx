import { PostType } from '../../../types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './postTile.module.scss';
import { CSSProperties } from 'react';

export interface PostTileProps
  extends Pick<PostType, 'postId' | 'subject' | 'images'> {
  style?: CSSProperties;
  onImageloaded: () => void;
}

const noImageURL = '/images/no-image.png';

const getCoverImage = (images?: string[]): string => {
  if (!images || images.length === 0) return noImageURL;

  return images[0];
};

export const PostTile: React.FC<PostTileProps> = ({
  postId,
  subject,
  images,
  style,
  onImageloaded,
}: PostTileProps) => {
  const coverImage = getCoverImage(images);

  return (
    <div className={styles.postTileArea} style={style}>
      <Link href={`post/${postId}`} className={styles.link}>
        <div className="relative">
          <div className={styles.ImageArea}>
            <Image
              src={coverImage}
              alt={subject}
              width={600}
              height={600}
              onLoad={onImageloaded}
            />
          </div>
        </div>

        <div className={styles.subject}>{subject}</div>
      </Link>
    </div>
  );
};
