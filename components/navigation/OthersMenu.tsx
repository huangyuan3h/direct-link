import clsx from 'clsx';
import { otherMenus } from './menuConfig';
import { NavButton } from './NavButton';
import styles from './navButton.module.scss';
import { usePathname } from 'next/navigation';

export interface OthersMenuProps {
  isOverlayPanel?: boolean;
}

export const OthersMenu: React.FC<OthersMenuProps> = ({ isOverlayPanel }) => {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        styles.otherMenus,
        isOverlayPanel && styles.otherMenusLeftPanel
      )}
    >
      {otherMenus.map((menu) => {
        return (
          <NavButton
            Icon={menu.Icon}
            url={menu.url ?? ''}
            title={menu.title}
            key={`menu-${menu.key}`}
            className={clsx(
              isOverlayPanel && styles.leftPannelStyle,
              pathname === menu.url && styles.active
            )}
          />
        );
      })}
    </div>
  );
};
