import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';
import { CSSProperties, useState } from 'react';
import { PostType } from '@/app/pages/posts/types';
import clsx from 'clsx';

export interface PostTileProps
  extends Pick<PostType, 'postId' | 'subject' | 'images'> {
  style?: CSSProperties;
  onImageloaded?: () => void;
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
  const [imageLoaded, setImageloaded] = useState(false);

  const handleImageLoaded = () => {
    setImageloaded(true);
    if (onImageloaded) {
      onImageloaded();
    }
  };

  return (
    <div
      className={clsx(styles.postTileArea, imageLoaded && styles.imageLoaded)}
      style={style}
    >
      <Link href={`/post/${postId}`} className={styles.link} prefetch={false}>
        <div className="relative">
          <div className={styles.ImageArea}>
            <Image
              src={coverImage}
              alt={subject}
              width={600}
              height={600}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              onLoad={handleImageLoaded}
            />
          </div>
        </div>

        <div className={styles.subject}>{subject}</div>
      </Link>
    </div>
  );
};
