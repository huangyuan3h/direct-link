import { CloseButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteFormProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteFormProps> = ({
  show,
  onClose,
  onConfirm,
}: DeleteFormProps) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body>
        <div className="flex flex-row-reverse">
          <CloseButton onClick={onClose} />
        </div>
        <div className="mt-4">你确定删除选中的帖子?</div>

        <div className="flex flex-row-reverse gap-x-2 mt-4">
          <Button variant="danger" onClick={onConfirm}>
            删除
          </Button>
          <Button variant="secondary" onClick={onClose}>
            关闭
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
