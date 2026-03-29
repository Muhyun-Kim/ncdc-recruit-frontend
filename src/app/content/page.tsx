"use client";

import {
  deleteContent,
  getContent,
  getContentList,
  GetContentListRes,
  GetContentRes,
  PutContentBody,
  updateContent,
} from "@/services/content";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CancelButton,
  DeleteButton,
  DoneButton,
  EditButton,
  NewPageButton,
  SaveButton,
} from "./(component)/button";

export default function ContentMain() {
  const [contentList, setContentList] = useState<GetContentListRes[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<number | null>(
    null,
  );
  const [selectedContent, setSelectedContent] = useState<GetContentRes | null>(
    null,
  );
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [isTitleReadOnly, setIsTitleReadOnly] = useState(true);
  const [isBodyReadOnly, setIsBodyReadOnly] = useState(true);
  const handleChangeTitleReadOnly = (isReadOnly: boolean) => {
    setIsTitleReadOnly(isReadOnly);
    if (!isReadOnly) {
      setTimeout(() => titleRef.current?.focus(), 0);
    }
  };
  const handleChangeBodyReadOnly = (isReadOnly: boolean) => {
    setIsBodyReadOnly(isReadOnly);
    if (!isReadOnly) {
      setTimeout(() => bodyRef.current?.focus(), 0);
    }
  };
  useEffect(() => {
    const fetchContentList = async () => {
      const res = await getContentList();
      setContentList(res);
      setSelectedContentId(res[0].id);
    };
    fetchContentList();
  }, []);
  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedContentId) return;
      const res = await getContent(selectedContentId);
      setSelectedContent(res);
    };
    fetchContent();
  }, [selectedContentId]);

  const handleSelectContent = (id: number) => {
    setSelectedContentId(id);
  };
  const handleChangeContent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (!selectedContent) return;
    setSelectedContent({ ...selectedContent, [name]: value } as GetContentRes);
  };
  const [mode, setMode] = useState<"edit" | "preview">("preview");
  const handleChangeMode = (string: "edit" | "preview") => {
    setMode(string);
  };
  const handleDeleteContent = (id: number) => {
    deleteContent(id).then(() => {
      setContentList(contentList.filter((content) => content.id !== id));
    });
  };
  const handleUpdateContent = (body: PutContentBody) => {
    if (!selectedContentId) return;
    updateContent(selectedContentId, body).then((res) => {
      setSelectedContent(res);
      setContentList((prev) =>
        prev.map((item) =>
          item.id === selectedContentId ? { ...item, title: res.title } : item,
        ),
      );
    });
  };
  return (
    <div className="flex h-full">
      {/* navbar */}
      <div className="h-full border-r border-bg-light flex flex-col justify-between bg-white rounded-[16px] mt-[30px] ml-[40px]">
        <div className="flex flex-col h-full w-[280px]">
          {/* logo */}
          <Link
            href="/"
            className="flex gap-2 items-center mb-[20px] w-[200px] h-[32px]"
          >
            <Image src="/icon/logo.svg" alt="logo" width={32} height={32} />
            <span className="text-title">ServiceName</span>
          </Link>
          {/* content list */}
          <div className="flex flex-col">
            {contentList.map((content) => (
              <div
                key={content.id}
                className={`h-[44px] flex justify-between items-center p-[10px] cursor-pointer ${selectedContentId === content.id ? "bg-bg-light" : ""}`}
                onClick={() => handleSelectContent(content.id)}
              >
                <span
                  className={`text-body ${selectedContentId === content.id ? "font-bold! text-[#32a8f8]!" : ""}`}
                >
                  {content.title}
                </span>
                {mode === "edit" && (
                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteContent(content.id);
                    }}
                    disabled={false}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* button */}
        <div className="h-[60px] p-[10px] bg-bg-light flex justify-between">
          {mode === "preview" ? (
            <>
              <div></div>
              <EditButton
                onClick={() => handleChangeMode("edit")}
                disabled={false}
              />
            </>
          ) : (
            <>
              <NewPageButton onClick={() => {}} disabled={false} />
              <DoneButton
                onClick={() => handleChangeMode("preview")}
                disabled={false}
              />
            </>
          )}
        </div>
      </div>
      {/* content */}
      <div className="w-full px-[40px] bg-white flex">
        <form className="bg-bg-light w-full h-full p-[30px] rounded-[16px] flex flex-col gap-[20px]">
          <div className="flex items-center justify-between h-[40px] gap-[20px]">
            <input
              ref={titleRef}
              name="title"
              className={`text-title pl-[30px] w-full ${isTitleReadOnly ? "pointer-events-none" : "focus:outline-light-blue"}`}
              value={selectedContent?.title ?? ""}
              onChange={handleChangeContent}
              readOnly={isTitleReadOnly}
            />
            {isTitleReadOnly ? (
              <EditButton
                onClick={() => handleChangeTitleReadOnly(false)}
                disabled={false}
              />
            ) : (
              <div className="flex gap-[10px]">
                <CancelButton
                  onClick={() => handleChangeTitleReadOnly(true)}
                  disabled={false}
                />
                <SaveButton
                  onClick={() => {
                    handleUpdateContent({
                      title: selectedContent?.title ?? "",
                      body: selectedContent?.body ?? "",
                    });
                    handleChangeTitleReadOnly(true);
                  }}
                  disabled={false}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between h-full gap-[20px]">
            <textarea
              ref={bodyRef}
              name="body"
              className={`w-full h-full p-[30px] rounded-[8px] bg-white ${isBodyReadOnly ? "pointer-events-none" : "focus:outline-light-blue"}`}
              value={selectedContent?.body ?? ""}
              onChange={handleChangeContent}
              readOnly={isBodyReadOnly}
            />
            {isBodyReadOnly ? (
              <EditButton
                onClick={() => handleChangeBodyReadOnly(false)}
                disabled={false}
              />
            ) : (
              <div className="flex gap-[10px]">
                <CancelButton
                  onClick={() => handleChangeBodyReadOnly(true)}
                  disabled={false}
                />
                <SaveButton
                  onClick={() => {
                    handleUpdateContent({
                      title: selectedContent?.title ?? "",
                      body: selectedContent?.body ?? "",
                    });
                    handleChangeBodyReadOnly(true);
                  }}
                  disabled={false}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
