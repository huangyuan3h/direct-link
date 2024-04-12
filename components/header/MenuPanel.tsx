import { useState } from 'react';
import { useUser } from '../user-context';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { Avator } from './Avator';

export interface MenuPanelProps {
  showPanel: boolean;
  onMenuClose: () => void;
}

export const MenuPanel: React.FC<MenuPanelProps> = ({
  showPanel,
  onMenuClose,
}) => {
  return (
    <Offcanvas show={showPanel} onHide={onMenuClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Avator />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
