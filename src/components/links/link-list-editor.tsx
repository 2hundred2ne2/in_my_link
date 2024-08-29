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

import { ENV } from "@/constants/env";
import { getSnsUrl } from "@/lib/utils";
import { Link, LinkType } from "@/types/link";

import { Button } from "../ui/button";

import { LinkAddModal } from "./link-add-modal";
import { LinkDeleteModal } from "./link-delete-modal";
import { LinkListItem } from "./link-list-item";
import { LinkImageDeleteModal } from "./linke-image-delete-modal";

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
  // 링크 이미지 삭제 확인 모달
  const [isImageDeleteModalOpen, setIsImageDeleteModalOpen] = useState(false);
  // 삭제할 이미지의 링크 ID
  const linkToImageDeleteIdRef = useRef<number | null>(null);

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

  const handleAddLink = async (type: LinkType) => {
    setIsAddModalOpen(false);
    const newLink: LinkItem = {
      id: Date.now(),
      title: "",
      url: type === "custom" ? "" : getSnsUrl(type),
      image: `/images/${type}-logo.png`,
      isEdit: true,
      type,
    };

    try {
      const response = await fetch(`${ENV.apiUrl}/api/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // FIXME 인증된 사용자 ID
          type: newLink.type,
          title: newLink.title,
          image: newLink.image,
          url: newLink.url,
        }),
      });

      if (!response.ok) {
        throw new Error("링크 추가에 실패했습니다");
      }

      const savedLink = await response.json();

      setLinks((prevLinks) => [...prevLinks, { ...savedLink, isEdit: true }]);
    } catch (error) {
      console.error("링크 추가 중 오류 발생:", error);
    }
  };

  const handleEditStart = (id: number) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, isEdit: true } : link)));
  };

  const handleEditEnd = (id: number) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, isEdit: false } : link)));
  };

  const handleChageTitle = async (id: number, value: string) => {
    try {
      const link = links.find((link) => link.id === id);

      if (!link) {
        return;
      }

      const response = await fetch(`${ENV.apiUrl}/api/links/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...link,
          userId: 1, //FIXME: 인증된 회원 아이디
          title: value,
        }),
      });

      if (!response.ok) {
        throw new Error("제목 수정에 실패했습니다");
      }

      setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, title: value } : link)));
    } catch (error) {
      console.error("링크 수정 중 오류 발생:", error);
    }
  };

  const handleChangeUrl = async (id: number, value: string) => {
    try {
      const link = links.find((link) => link.id === id);

      if (!link) {
        return;
      }

      let newUrl: string = value;
      if (link.type !== "custom") {
        const prefix = getSnsUrl(link.type);
        const username = value.slice(prefix.length);
        newUrl = `${prefix}${username}`;
      }

      const response = await fetch(`${ENV.apiUrl}/api/links/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...link,
          userId: 1, //FIXME: 인증된 회원 아이디
          url: newUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("URL 수정에 실패했습니다");
      }

      setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, url: newUrl } : link)));
    } catch (error) {
      console.error("링크 수정 중 오류 발생:", error);
    }
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

  const handleDeleteImageClick = (id: number) => {
    setIsImageDeleteModalOpen(true);
    linkToImageDeleteIdRef.current = id;
  };

  const handleConfirmDeleteImage = async () => {
    if (!linkToImageDeleteIdRef.current) {
      return;
    }

    try {
      const id = linkToImageDeleteIdRef.current;
      const link = links.find((link) => link.id === id);

      if (!link) {
        return;
      }

      setIsImageDeleteModalOpen(false);
      linkToImageDeleteIdRef.current = null;

      const response = await fetch(`${ENV.apiUrl}/api/links/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...link,
          userId: 1, //FIXME: 인증된 회원 아이디
          image: `/images/custom-logo.png`,
        }),
      });

      if (!response.ok) {
        throw new Error("URL 수정에 실패했습니다");
      }

      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, image: `/images/custom-logo.png` } : link,
        ),
      );
    } catch (error) {
      console.error("링크 수정 중 오류 발생:", error);
    }
  };

  return (
    <>
      {/* 삭제 확인 모달 */}
      <LinkDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      />
      {/* 이미지 삭제 확인 모달 */}
      <LinkImageDeleteModal
        isOpen={isImageDeleteModalOpen}
        onClose={() => setIsImageDeleteModalOpen(false)}
        onDelete={handleConfirmDeleteImage}
      />

      {/* 링크 추가하기 */}
      <div className="mt-6 px-3">
        <Button
          size="large"
          radius="full"
          className="w-full"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} className="-ml-1 mr-2" />
          추가하기
        </Button>
        <LinkAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddLink}
        />
      </div>

      <section className="mb-16 mt-8">
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
                      onClickDeleteImage={(id) => handleDeleteImageClick(id)}
                      onClickDelete={(id) => handleDeleteClick(id)}
                    />
                  </li>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </section>
    </>
  );
}
