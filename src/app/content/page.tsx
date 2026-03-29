"use client";

import {
  createContent,
  deleteContent,
  getContent,
  getContentList,
  GetContentListRes,
  GetContentRes,
  PutContentBody,
  updateContent,
} from "@/services/content";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Content from "./content";

export default function ContentMain() {
  const [contentList, setContentList] = useState<GetContentListRes[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<number | null>(
    null,
  );
  const [selectedContent, setSelectedContent] = useState<GetContentRes | null>(
    null,
  );
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
  const handleCreateContent = () => {
    createContent({ title: "New Page", body: "" }).then((res) => {
      setContentList((prev) => [
        ...prev,
        {
          id: res.id,
          title: res.title,
          createdAt: res.createdAt,
          updatedAt: res.updatedAt,
        },
      ]);
      setSelectedContentId(res.id);
    });
  };
  const handleCancelContent = () => {
    if (!selectedContentId) return;
    getContent(selectedContentId).then((res) => {
      setSelectedContent(res);
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
      <Navbar
        contentList={contentList}
        selectedContentId={selectedContentId}
        handleSelectContent={handleSelectContent}
        mode={mode}
        handleDeleteContent={handleDeleteContent}
        handleChangeMode={handleChangeMode}
        handleCreateContent={handleCreateContent}
      />
      {/* content */}
      <Content
        selectedContent={selectedContent}
        onChangeContent={handleChangeContent}
        onUpdateContent={handleUpdateContent}
        onCancelContent={handleCancelContent}
      />
    </div>
  );
}
