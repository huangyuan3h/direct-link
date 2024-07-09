import Image from 'next/image';
import Link from 'next/link';
import styles from './postTile.module.scss';
import { CSSProperties, useEffect, useState } from 'react';
import { PostType } from '@/app/pages/posts/types';
import clsx from 'clsx';
import { useWindowWidth } from '@/utils/hooks/useWindowWidth';
import { breakpoints } from '@/utils/breakpoint';

export interface PostTileProps
  extends Pick<PostType, 'postId' | 'subject' | 'images'> {
  style?: CSSProperties;
  onImageloaded?: () => void;
  onChecked?: (id: string) => void;
  checked?: boolean;
  lazyloadImage?: boolean;
  priority?: boolean;
}

const noImageURL = '/images/no-image.png';

const getCoverImage = (images?: string[]): string => {
  if (!images || images.length === 0) return noImageURL;

  return images[0];
};

const Mobile_Size = 100;
const Desktop_size = 200;

export const PostTile: React.FC<PostTileProps> = ({
  postId,
  subject,
  images,
  style,
  onImageloaded,
  onChecked,
  checked,
  lazyloadImage = true,
  priority = false,
}: PostTileProps) => {
  const coverImage = getCoverImage(images);
  const [imageLoaded, setImageloaded] = useState(false);

  const windowWidth = useWindowWidth();

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(windowWidth < breakpoints.sm);
  }, [windowWidth]);

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
              width={isMobile ? Mobile_Size : Desktop_size}
              height={isMobile ? Mobile_Size : Desktop_size}
              loading={lazyloadImage ? 'lazy' : 'eager'}
              onLoad={handleImageLoaded}
              priority={priority}
            />
          </div>
        </div>

        <h2 className={styles.subject}>{subject}</h2>
      </Link>
    </article>
  );
};
