"use client";

import { useEffect, useRef, useState } from "react";

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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CaretDown,
  CaretUp,
  DotsSixVertical,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Text } from "./ui/text";

/**
 * TODO: 코드 길어지면 파일로 분리
 */

interface LinkInputProps {
  label: string;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
}

function LinkInput({ label, value = "", className, onChange }: LinkInputProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEdit(false);
    if (onChange) {
      onChange(inputValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <div className="grid pl-2 w-full text-sm">
      <label className={cn("row-start-1 col-start-1", className, !isEdit && "sr-only")}>
        <span className="sr-only">{label}</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={label}
          className="w-full min-h-7 outline-none"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </label>
      <div
        className={cn("row-start-1 col-start-1 overflow-hidden", className, isEdit && "sr-only")}
      >
        <button
          type="button"
          className="flex items-center max-w-full min-h-7"
          onClick={() => setIsEdit(true)}
        >
          <span
            className={cn(
              "max-w-full whitespace-nowrap text-ellipsis overflow-hidden",
              inputValue.trim().length === 0 && "text-foreground-muted",
            )}
          >
            {inputValue || label}
          </span>
          <PencilSimple size={16} className="ml-2 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}

interface LinkBlockProps {
  /**
   * 링크 id
   */
  id: string;

  /**
   * 링크 제목
   */
  title?: string;

  /**
   * 링크 URL
   */
  url: string;

  /**
   * 링크 이미지
   */
  image?: string;
}

export function LinkBlock({ id, title, url, image }: LinkBlockProps) {
  const [isEdit, setIsEdit] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  if (!isEdit) {
    return (
      <Card
        ref={setNodeRef}
        variant="default"
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className="rounded-2xl flex p-0"
      >
        <div {...attributes} {...listeners} className="flex items-center justify-center touch-none">
          <button type="button" className="cursor-grab px-2 w-full h-full">
            <DotsSixVertical size={16} />
          </button>
        </div>

        <div className="flex items-center px-3 py-4 w-full">
          {/* 이미지 */}
          <span className="min-w-8 min-h-8 inline-block bg-primary-300 rounded-xl"></span>

          <Text className="font-medium w-full text-center">{title ?? "Title"}</Text>

          <Button
            type="button"
            variant="text"
            className="p-0 min-w-7 min-h-7 rounded-full"
            onClick={() => setIsEdit(true)}
          >
            <CaretDown size={16} />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card ref={setNodeRef} variant="default" className="rounded-2xl flex flex-col p-0">
      {/* header */}
      <div className="flex items-center pl-6 py-4 pr-3">
        <div className="relative flex items-center">
          {/* TODO: 이미지 */}
          <button type="button">
            <span className="min-w-8 min-h-8 block bg-primary-300 rounded-xl"></span>
          </button>
          {/* TODO: 이미지 삭제 */}
          <button
            type="button"
            className="absolute inline-flex text-foreground-inverted items-center justify-center bg-danger min-w-[18px] min-h-[18px] rounded-full -right-1 -bottom-1"
          >
            <Trash size={14} />
          </button>
        </div>

        <LinkInput label="Title" value={title} className="font-medium" />

        <Button
          type="button"
          variant="text"
          className="ml-4 p-0 min-w-7 min-h-7 rounded-full"
          onClick={() => setIsEdit(false)}
        >
          <CaretUp size={16} />
        </Button>
      </div>

      {/* body */}
      <div className="pl-6 pr-3">
        <LinkInput label="URL" value={url} />
      </div>

      {/* footer */}
      {/* TODO: 삭제 */}
      <div className="flex justify-end pr-3 py-3">
        <Button type="button" variant="text" className="p-0 min-w-7 min-h-7 rounded-full">
          <Trash size={16} />
        </Button>
      </div>
    </Card>
  );
}

interface Link {
  id: string;
  title?: string;
  url: string;
  image?: string;
}

interface LinkEditorProps {
  links: Link[];
}

export function LinkEditor({ links: initialLinks = [] }: LinkEditorProps) {
  const [links, setLinks] = useState(initialLinks);

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

  return (
    <>
      <div className="mt-6 px-3">
        {/* TODO: 추가 모달 */}
        <Button size="large" radius="full" className="w-full">
          <Plus size={16} className="mr-2 -ml-1" />
          추가하기
        </Button>
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
                    <LinkBlock id={link.id} title={link.title} url={link.url} image={link.image} />
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
