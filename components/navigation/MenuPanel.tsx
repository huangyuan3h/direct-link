import { useUser } from '../user-context';
import { Accordion, Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { Avatar } from '../avatar';
import { menuConfig } from './menuConfig';
import { NavButton } from './NavButton';

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
              />
            );
          }
        })}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
