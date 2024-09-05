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
import toast from "react-hot-toast";

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

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    // 유효한 드롭 영역이 아닌 곳에 놓았을 경우
    // 드래그한 아이템과 드롭한 위치 아이템이 같은 경우
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = links.findIndex((item) => item.id === active.id);
    const newIndex = links.findIndex((item) => item.id === over.id);

    // 순서 업데이트
    const newLinks = arrayMove(links, oldIndex, newIndex);
    const updatedLinks = newLinks.map((link, index) => ({
      ...link,
      order: index + 1,
    }));

    const originalLinks = [...links];
    setLinks(updatedLinks);

    try {
      const response = await fetch(`${ENV.apiUrl}/api/links/reorder`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLinks.map((link) => ({ id: link.id, order: link.order }))),
      });

      if (!response.ok) {
        throw new Error("링크 순서 업데이트에 실패했습니다");
      }
    } catch (error) {
      console.error("링크 순서 변경 중 오류 발생:", error);
      toast("순서 변경에 오류가 있어요. 잠시후에 다시 시도해주세요");
      setLinks(originalLinks);
    }
  };

  const handleAddLink = async (type: LinkType) => {
    setIsAddModalOpen(false);

    const tempId = Date.now();

    const newLink: LinkItem = {
      id: tempId,
      title: "",
      url: type === "custom" ? "https://" : getSnsUrl(type),
      image: `/images/${type}-logo.png`,
      isEdit: true,
      type,
    };

    setLinks((prevLinks) => [...prevLinks, newLink]);

    try {
      const response = await fetch(`${ENV.apiUrl}/api/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          links: [
            {
              type: newLink.type,
              title: newLink.title,
              image: newLink.image,
              url: newLink.url,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("링크 추가에 실패했습니다");
      }

      const [savedLink] = await response.json();

      // 서버에서 받은 ID로 업데이트
      setLinks((prevLinks) =>
        prevLinks.map((link) => (link.id === tempId ? { ...link, id: savedLink.id } : link)),
      );
    } catch (error) {
      console.error("링크 추가 중 오류 발생:", error);
      toast("링크 추가에 실패했어요. 잠시후에 다시 시도해주세요");
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== tempId));
    }
  };

  const handleEditStart = (id: number) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, isEdit: true } : link)));
  };

  const handleEditEnd = (id: number) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, isEdit: false } : link)));
  };

  const handleChageTitle = async (id: number, newTitle: string) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, title: newTitle } : link)));
  };

  const handleChangeUrl = (id: number, newUrl: string) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, url: newUrl } : link)));
  };

  const handleDeleteClick = (id: number) => {
    setIsDeleteModalOpen(true);
    linkToDeleteIdRef.current = id;
  };

  const handleConfirmDelete = async () => {
    if (!linkToDeleteIdRef.current) {
      return;
    }

    const id = linkToDeleteIdRef.current;
    setIsDeleteModalOpen(false);
    linkToDeleteIdRef.current = null;

    const originalLinks = [...links];
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));

    try {
      const response = await fetch(`${ENV.apiUrl}/api/links/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("링크 삭제에 실패했습니다");
      }

      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    } catch (error) {
      console.error("링크 삭제 중 오류 발생:", error);
      toast("링크 삭제에 실패했어요. 잠시후에 다시 시도해주세요");
      setLinks(originalLinks);
    }
  };

  const handleDeleteImageClick = (id: number) => {
    setIsImageDeleteModalOpen(true);
    linkToImageDeleteIdRef.current = id;
  };

  const handleConfirmDeleteImage = async () => {
    if (!linkToImageDeleteIdRef.current) {
      return;
    }

    const id = linkToImageDeleteIdRef.current;
    const link = links.find((link) => link.id === id);

    if (!link) {
      return;
    }

    setIsImageDeleteModalOpen(false);
    linkToImageDeleteIdRef.current = null;

    const originalLinks = [...links];
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, image: `/images/custom-logo.png` } : link,
      ),
    );

    try {
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
        throw new Error("이미지 삭제에 실패했습니다");
      }

      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, image: `/images/custom-logo.png` } : link,
        ),
      );
    } catch (error) {
      console.error("링크 수정 중 오류 발생:", error);
      toast("이미지 삭제에 실패했어요. 잠시후에 다시 시도해주세요");
      setLinks(originalLinks);
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
            // @see https://github.com/clauderic/dnd-kit/issues/926
            id="link-list-dnd-context"
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
