import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteFormProps {
  title: string;
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteFormProps> = ({
  title,
  show,
  onClose,
  onConfirm,
}: DeleteFormProps) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>删除{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>你确定删除: {title}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          关闭
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          删除
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
