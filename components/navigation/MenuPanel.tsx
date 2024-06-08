import { useUser } from '../user-context';
import { Button, Offcanvas } from 'react-bootstrap';
import { Avatar } from '../avatar';
import { Menus } from './Menus';
import styles from './navButton.module.scss';

export interface MenuPanelProps {
  showPanel: boolean;
  onMenuClose: () => void;
}

export const MenuPanel: React.FC<MenuPanelProps> = ({
  showPanel,
  onMenuClose,
}) => {
  const { user } = useUser();
  return (
    <Offcanvas show={showPanel} onHide={onMenuClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Avatar withName />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {user && (
          <div className="d-grid gap-2 mb-4">
            <Button href="/post">发帖</Button>
          </div>
        )}
        <div className={styles.menuContainer}>
          <Menus isOverlayPanel />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
