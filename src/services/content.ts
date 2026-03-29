export interface GetContentListRes {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface PostContentBody {
  title: string;
  body: string;
}

interface PostContentRes {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetContentRes {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface PutContentBody {
  title: string;
  body: string;
}

interface PutContentRes {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export async function getContentList(): Promise<GetContentListRes[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch content list");
  }
  return response.json();
}

export async function getContent(id: number): Promise<GetContentRes> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch content");
  }
  return response.json();
}

export async function deleteContent(id: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content/${id}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to delete content");
  }
}
