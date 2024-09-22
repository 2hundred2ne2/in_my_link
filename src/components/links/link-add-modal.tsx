import Image from "next/image";

import { LinkType } from "@/types/link";

import { Heading } from "../ui/heading";
import { Modal } from "../ui/modal";
import { Text } from "../ui/text";

const links: { type: LinkType; label: string }[] = [
  { type: "custom", label: "커스텀" },
  { type: "instagram", label: "인스타그램" },
  { type: "facebook", label: "페이스북" },
  { type: "threads", label: "쓰레드" },
  { type: "x", label: "X(트위터)" },
  { type: "tiktok", label: "틱톡" },
  { type: "naver", label: "네이버블로그" },
  { type: "github", label: "깃허브" },
];

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
        {links.map((link) => (
          <button key={link.type} className="grid gap-1" onClick={() => onAdd(link.type)}>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background-muted">
              <Image
                src={`/images/${link.type}-logo.png`}
                alt={link.label}
                width={256}
                height={256}
                className="h-10 w-10 rounded-xl"
              />
            </span>
            <Text>{link.label}</Text>
          </button>
        ))}
      </div>
    </Modal>
  );
}
