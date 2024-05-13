import { PostType } from '../../../types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './postTile.module.scss';
import { CSSProperties } from 'react';

export interface PostTileProps
  extends Pick<PostType, 'postId' | 'subject' | 'images'> {
  style?: CSSProperties;
}

const noImageURL = '/images/no-image.png';

const getCovderImage = (images?: string[]): string => {
  if (!images || images.length === 0) return noImageURL;

  return images[0];
};

export const PostTile: React.FC<PostTileProps> = ({
  postId,
  subject,
  images,
  style,
}: PostTileProps) => {
  const coverImage = getCovderImage(images);

  return (
    <div className={styles.postTileArea} style={style}>
      <Link href={`post/${postId}`} className={styles.link}>
        <div className="relative">
          <div className={styles.ImageArea}>
            <Image src={coverImage} alt={subject} width={600} height={600} />
          </div>
        </div>

        <div className={styles.subject}>{subject}</div>
      </Link>
    </div>
  );
};
