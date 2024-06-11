import { Accordion, Button, ListGroup } from 'react-bootstrap';
import { NavButton } from './NavButton';
import { menuConfig } from './menuConfig';
import styles from './navButton.module.scss';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export interface MenusProps {
  isOverlayPanel?: boolean;
}

export const Menus: React.FC<MenusProps> = ({ isOverlayPanel }: MenusProps) => {
  const pathname = usePathname();
  return (
    <>
      {menuConfig.map((menu, idx) => {
        if (!menu.url && menu.children && menu.children.length) {
          return (
            <Accordion.Item key={`menu-${menu.key}`} eventKey={`${idx}`}>
              <Accordion.Header>{menu.title}</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  {menu.children.map((c) => {
                    return (
                      <ListGroup.Item key={`menu-child-${c.key}`}>
                        <Button variant="link" href={c.url}>
                          {c.title}
                        </Button>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          );
        } else {
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
        }
      })}
    </>
  );
};
