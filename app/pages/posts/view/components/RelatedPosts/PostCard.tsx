import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PostCard.module.scss';
import { PostType } from '../../../types';
import { getImageUrl } from '@/utils/getImageUrl';

interface PostCardProps {
  post: PostType;
}

function removeHTMLTags(htmlString: string): string {
  const regex = /<[^>]+>/g; // Regular expression to match HTML tags
  return htmlString.replace(regex, ''); // Replace tags with empty string
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const content = removeHTMLTags(post.content);
  return (
    <Link href={`/posts/${post.postId}`} className={styles.postLink}>
      <Card className={styles.postCard}>
        <Row>
          <Col xs={4} className={styles.imageContainer}>
            {
              <Image
                src={getImageUrl(post.images[0])}
                alt={post.subject}
                layout="fill"
                objectFit="cover"
                className={styles.image}
              />
            }
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{post.subject}</Card.Title>
              <Card.Text className={styles.postContent}>
                {content.length > 100
                  ? `${content.substring(0, 100)}...`
                  : content}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default PostCard;
