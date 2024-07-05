import Image from 'next/image';
import Link from 'next/link';
import styles from './postTile.module.scss';
import { CSSProperties, useState } from 'react';
import { PostType } from '@/app/pages/posts/types';
import clsx from 'clsx';
import { getImageUrl } from '@/utils/getImageUrl';

export interface PostTileProps
  extends Pick<PostType, 'postId' | 'subject' | 'images'> {
  style?: CSSProperties;
  onImageloaded?: () => void;
  onChecked?: (id: string) => void;
  checked?: boolean;
  lazyloadImage?: boolean;
}

const noImageURL = '/images/no-image.png';

const getCoverImage = (images?: string[]): string => {
  if (!images || images.length === 0) return noImageURL;

  return getImageUrl(images[0]);
};

export const PostTile: React.FC<PostTileProps> = ({
  postId,
  subject,
  images,
  style,
  onImageloaded,
  onChecked,
  checked,
  lazyloadImage = true,
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
    <article
      className={clsx(styles.postTileArea, imageLoaded && styles.imageLoaded)}
      style={style}
    >
      {onChecked && (
        <div className={styles.checkbox}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onClick={() => onChecked(postId)}
          />
        </div>
      )}
      <Link
        href={`/post/${postId}`}
        className={styles.link}
        prefetch={false}
        target="_blank"
      >
        <div className="relative">
          <div className={styles.ImageArea}>
            <Image
              src={coverImage}
              alt={subject}
              width={600}
              height={600}
              loading={lazyloadImage ? 'lazy' : 'eager'}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              onLoad={handleImageLoaded}
            />
          </div>
        </div>

        <h2 className={styles.subject}>{subject}</h2>
      </Link>
    </article>
  );
};
