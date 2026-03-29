import { useRef, useState } from "react";
import { GetContentRes, PutContentBody } from "@/services/content";
import {
  CancelButton,
  EditButton,
  SaveButton,
} from "../../../component/button";
import { contentSchema } from "../schema";

export default function Content({
  selectedContent,
  onChangeContent,
  onUpdateContent,
  onCancelContent,
}: {
  selectedContent: GetContentRes | null;
  onChangeContent: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onUpdateContent: (body: PutContentBody) => void;
  onCancelContent: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [isTitleReadOnly, setIsTitleReadOnly] = useState(true);
  const [isBodyReadOnly, setIsBodyReadOnly] = useState(true);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);

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

  return (
    <div className="w-full px-[40px] bg-white flex">
      <form className="bg-bg-light w-full h-full p-[30px] rounded-[16px] flex flex-col gap-[20px]">
        <div className="flex items-center justify-between h-[40px] gap-[20px]">
          <input
            ref={titleRef}
            name="title"
            className={`text-title pl-[30px] w-full ${isTitleReadOnly ? "pointer-events-none" : "focus:outline-light-blue"}`}
            value={selectedContent?.title ?? ""}
            onChange={onChangeContent}
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
                onClick={() => {
                  setTitleError(null);
                  onCancelContent();
                  handleChangeTitleReadOnly(true);
                }}
                disabled={false}
              />
              <SaveButton
                onClick={() => {
                  const result = contentSchema.shape.title.safeParse(
                    selectedContent?.title ?? "",
                  );
                  if (!result.success) {
                    setTitleError(result.error.issues[0].message);
                    return;
                  }
                  setTitleError(null);
                  onUpdateContent({
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
        {titleError && (
          <span className="text-caption text-error!">{titleError}</span>
        )}
        <div className="flex justify-between h-full gap-[20px]">
          <div className="flex flex-col gap-[10px] w-full">
            <textarea
              ref={bodyRef}
              name="body"
              className={`w-full h-full p-[30px] rounded-[8px] bg-white ${isBodyReadOnly ? "pointer-events-none" : "focus:outline-light-blue"}`}
              value={selectedContent?.body ?? ""}
              onChange={onChangeContent}
              readOnly={isBodyReadOnly}
            />
            {bodyError && (
              <span className="text-caption text-error!">{bodyError}</span>
            )}
          </div>
          {isBodyReadOnly ? (
            <EditButton
              onClick={() => handleChangeBodyReadOnly(false)}
              disabled={false}
            />
          ) : (
            <div className="flex gap-[10px]">
              <CancelButton
                onClick={() => {
                  setBodyError(null);
                  onCancelContent();
                  handleChangeBodyReadOnly(true);
                }}
                disabled={false}
              />
              <SaveButton
                onClick={() => {
                  const result = contentSchema.shape.body.safeParse(
                    selectedContent?.body ?? "",
                  );
                  if (!result.success) {
                    setBodyError(result.error.issues[0].message);
                    return;
                  }
                  setBodyError(null);
                  onUpdateContent({
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
  );
}
