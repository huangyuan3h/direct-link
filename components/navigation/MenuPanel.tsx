import { useUser } from '../user-context';
import { Accordion, Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { Avatar } from '../avatar';
import { menuConfig } from './menuConfig';

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
          <Avatar />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {user && (
          <div className="d-grid gap-2 mb-4">
            <Button href="/post">发帖</Button>
          </div>
        )}

        {menuConfig.map((menu, idx) => {
          if (menu.children && menu.children.length) {
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
              <Button
                variant="outline-secondary"
                key={`menu-${menu.key}`}
                size="lg"
              >
                {menu.title}
              </Button>
            );
          }
        })}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
