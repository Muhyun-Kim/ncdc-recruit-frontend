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

export interface PutContentBody {
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

export async function createContent(
  body: PostContentBody,
): Promise<PostContentRes> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Failed to create content");
  }
  return response.json();
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

export async function updateContent(
  id: number,
  body: PutContentBody,
): Promise<PutContentRes> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to update content");
  }
  return response.json();
}
