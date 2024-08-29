import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Modal } from "../ui/modal";

interface LinkImageDeleteModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달 닫기를 누를 때 호출되는 콜백 함수  */
  onClose: () => void;
  /** 삭제를 누를 때 호출되는 콜백 함수  */
  onDelete: () => void;
}

export function LinkImageDeleteModal({ isOpen, onClose, onDelete }: LinkImageDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading variant="heading2" className="text-center">
        이미지 삭제 확인
      </Heading>
      <p className="mb-6 mt-3 text-center">정말로 이미지를 삭제하시나요?</p>
      <div className="grid gap-2">
        <Button size="large" variant="secondary" className="text-danger" onClick={onDelete}>
          삭제
        </Button>
        <Button size="large" variant="text" onClick={onClose}>
          취소
        </Button>
      </div>
    </Modal>
  );
}
