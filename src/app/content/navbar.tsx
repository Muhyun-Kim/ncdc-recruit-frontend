import { GetContentListRes } from "@/services/content";
import Link from "next/link";
import Image from "next/image";
import {
  DeleteButton,
  DoneButton,
  EditButton,
  NewPageButton,
} from "./(component)/button";

export default function Navbar({
  contentList,
  selectedContentId,
  handleSelectContent,
  mode,
  handleDeleteContent,
  handleChangeMode,
  handleCreateContent,
}: {
  contentList: GetContentListRes[];
  selectedContentId: number | null;
  handleSelectContent: (id: number) => void;
  mode: "edit" | "preview";
  handleDeleteContent: (id: number) => void;
  handleChangeMode: (string: "edit" | "preview") => void;
  handleCreateContent: () => void;
}) {
  return (
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
            <NewPageButton onClick={handleCreateContent} disabled={false} />
            <DoneButton
              onClick={() => handleChangeMode("preview")}
              disabled={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
