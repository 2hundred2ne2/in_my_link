"use client";

import { useRef, useState } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "@phosphor-icons/react";

import { getSnsUrl } from "@/lib/utils";
import { Link, LinkType } from "@/types/link";

import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Modal } from "../ui/modal";

import { LinkListItem } from "./link-list-item";

interface LinkItem extends Pick<Link, "id" | "type" | "title" | "url" | "image"> {
  isEdit: boolean;
}

interface LinkListEditorProps {
  links: Pick<Link, "id" | "type" | "title" | "url" | "image">[];
}

export function LinkListEditor({ links: initialLinks = [] }: LinkListEditorProps) {
  // 링크목록
  const [links, setLinks] = useState<LinkItem[]>(
    initialLinks.map((link) => ({
      ...link,
      isEdit: false,
    })),
  );
  // 링크 추가 확인 모달
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // 링크 삭제 확인 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // 삭제할 링크 ID
  const linkToDeleteIdRef = useRef<number | null>(null);

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    // 유효한 드롭 영역이 아닌 곳에 놓았을 경우
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddLink = (type: LinkType) => {
    setIsAddModalOpen(false);
    const newLink: LinkItem = {
      id: Date.now(),
      title: "",
      url: type === "custom" ? "" : getSnsUrl(type),
      image: "",
      isEdit: true,
      type,
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const handleEditStart = (id: number) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, isEdit: true } : link)));
  };

  const handleEditEnd = (id: number) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, isEdit: false } : link)));
  };

  const handleChageTitle = (id: number, value: string) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, title: value } : link)));
  };

  const handleChangeUrl = (id: number, value: string) => {
    setLinks((prev) =>
      prev.map((link) => {
        if (link.id === id) {
          if (link.type !== "custom") {
            const prefix = getSnsUrl(link.type);
            const username = value.slice(prefix.length);
            return { ...link, url: `${prefix}${username}` };
          }
          return { ...link, url: value };
        }
        return link;
      }),
    );
  };

  const handleDeleteClick = (id: number) => {
    setIsDeleteModalOpen(true);
    linkToDeleteIdRef.current = id;
  };

  const handleConfirmDelete = () => {
    if (linkToDeleteIdRef.current) {
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkToDeleteIdRef.current));
    }
    setIsDeleteModalOpen(false);
    linkToDeleteIdRef.current = null;
  };

  return (
    <>
      <div className="mt-6 px-3">
        <Button
          size="large"
          radius="full"
          className="w-full"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} className="mr-2 -ml-1" />
          추가하기
        </Button>
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <Heading variant="subtitle2" className="text-center mb-6">
            어떤 링크를 추가할까요?
          </Heading>
          <div className="flex items-center justify-center">
            <button className="w-8 h-8 rounded-xl" onClick={() => handleAddLink("instagram")}>
              인스타그램
            </button>
            <button className="w-8 h-8 rounded-xl" onClick={() => handleAddLink("facebook")}>
              페이스북
            </button>
            <button className="w-8 h-8 rounded-xl" onClick={() => handleAddLink("threads")}>
              쓰레드
            </button>
            <button className="w-8 h-8 rounded-xl" onClick={() => handleAddLink("custom")}>
              커스텀
            </button>
          </div>
        </Modal>
      </div>

      <section className="mt-8 mb-16">
        <h1 className="sr-only">링크 리스트</h1>

        {links.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={links.map((link) => link.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="flex flex-col gap-2 px-3">
                {links.map((link) => (
                  <li key={link.id}>
                    <LinkListItem
                      id={link.id}
                      title={link.title}
                      url={link.url}
                      image={link.image}
                      isEdit={link.isEdit}
                      type={link.type}
                      onEditStart={handleEditStart}
                      onEditEnd={handleEditEnd}
                      onChangeTitle={handleChageTitle}
                      onChangeUrl={handleChangeUrl}
                      onClickDelete={() => handleDeleteClick(link.id)}
                    />
                  </li>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </section>

      {/* 삭제 확인 모달 */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Heading variant="heading2" className="text-center">
          링크 삭제 확인
        </Heading>
        <p className="mt-3 mb-6 text-center">정말로 이 링크를 삭제하시겠습니까?</p>
        <div className="grid gap-2">
          <Button
            size="large"
            variant="secondary"
            className="text-danger"
            onClick={handleConfirmDelete}
          >
            삭제
          </Button>
          <Button size="large" variant="text" onClick={() => setIsDeleteModalOpen(false)}>
            취소
          </Button>
        </div>
      </Modal>
    </>
  );
}
