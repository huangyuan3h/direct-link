import React, { useState, useEffect } from 'react';
import styles from './FloatingActions.module.scss';

interface FloatingActionsProps {
  // 可以加入props来控制显示内容，例如：
  // replyCount: number;
  // likeCount: number;
}

const FloatingActions: React.FC<FloatingActionsProps> = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // 判断设备类型，可以使用window.innerWidth或者其他媒体查询方式
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`${styles.floatingActions} ${isDesktop ? styles.desktop : styles.mobile}`}
    >
      <button className={styles.actionButton}>
        <span className="material-icons">reply</span>
        {/* 可以根据props动态显示数量 */}
        {/* <span>{replyCount}</span> */}
      </button>
      <button className={styles.actionButton}>
        <span className="material-icons">favorite</span>
        {/* <span>{likeCount}</span>  */}
      </button>
      {/* 可以根据需要添加更多按钮 */}
    </div>
  );
};

export default FloatingActions;
