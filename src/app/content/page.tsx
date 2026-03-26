"use client";

import { getContentList, GetContentListRes } from "@/services/content";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ContentMain() {
  const [contentList, setContentList] = useState<GetContentListRes[]>([]);
  useEffect(() => {
    const fetchContentList = async () => {
      const res = await getContentList();
      setContentList(res);
    };
    fetchContentList();
  }, []);
  return (
    <div className="flex h-full">
      {/* navbar */}
      <nav className="w-[240px] h-full bg-amber-50 mb-[20px]">
        <div>
          <Link href="/" className="flex gap-2 items-center p-b-20">
            <Image src="/icon/logo.svg" alt="logo" width={32} height={32} />
            <span className="text-title">Service Name</span>
          </Link>
          <div className="flex flex-col">
            {contentList.map((content) => (
              <button key={content.id} className="h-[44px] flex justify-start">
                <span className="text-body">{content.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      {/* content */}
      <div className="flex-1">
        <div>
          <h1 className="text-title">Content Title</h1>
        </div>
      </div>
    </div>
  );
}
