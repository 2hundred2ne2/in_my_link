import Image from "next/image";

import { LinkType } from "@/types/link";

import { Heading } from "../ui/heading";
import { Modal } from "../ui/modal";
import { Text } from "../ui/text";

interface LinkAddModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달 닫기를 누를 때 호출되는 콜백 함수  */
  onClose: () => void;
  /** 추가할 링크를 누를 때 호출되는 콜백 함수  */
  onAdd: (type: LinkType) => void;
}

export function LinkAddModal({ isOpen, onClose, onAdd }: LinkAddModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading variant="subtitle2" className="mb-6 text-center">
        어떤 링크를 추가할까요?
      </Heading>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="grid gap-1" onClick={() => onAdd("instagram")}>
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background-muted">
            <Image
              src="/images/instagram-logo.png"
              alt="인스타그램"
              width={256}
              height={256}
              className="h-10 w-10 rounded-xl"
            />
          </span>
          <Text>인스타그램</Text>
        </button>
        <button className="grid gap-1" onClick={() => onAdd("facebook")}>
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background-muted">
            <Image
              src="/images/facebook-logo.png"
              alt="페이스북"
              width={256}
              height={256}
              className="h-10 w-10 rounded-xl"
            />
          </span>
          <Text>페이스북</Text>
        </button>
        <button className="grid gap-1" onClick={() => onAdd("threads")}>
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background-muted">
            <Image
              src="/images/threads-logo.png"
              alt="쓰레드"
              width={256}
              height={256}
              className="h-10 w-10 rounded-xl"
            />
          </span>
          <Text>쓰레드</Text>
        </button>
        <button className="grid gap-1" onClick={() => onAdd("custom")}>
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background-muted">
            <Image
              src="/images/custom-logo.png"
              alt="커스텀"
              width={256}
              height={256}
              className="h-10 w-10 rounded-xl"
            />
          </span>
          <Text>커스텀</Text>
        </button>
      </div>
    </Modal>
  );
}
