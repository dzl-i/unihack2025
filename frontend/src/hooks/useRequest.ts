"use client";

import useSWR from "swr";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export default function useQuery(url: string) {
  const { data, error, isLoading, isValidating } = useSWR(url, (url) =>
    fetch(process.env.NEXT_PUBLIC_BASE_URL + url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json())
  );

  return { data, error, isLoading, isValidating };
}

export const request = async (
  method: RequestMethod,
  url: string,
  body?: any
) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(
        data?.error || `Request failed with status ${response.status}`
      );
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: String(err) };
  }
};