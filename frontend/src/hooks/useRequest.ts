"use client";

import useSWR from "swr";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export default function useQuery(url: string) {
  const { data, error, isLoading, mutate } = useSWR(url, (url) =>
    fetch(process.env.NEXT_PUBLIC_BASE_URL + url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json())
  );

  // Return mutate as refetch so it can be used to refresh data
  return { data, error, isLoading, refetch: () => mutate() };
}

export const request = async (
  method: RequestMethod,
  url: string,
  body?: FormData | Record<string, unknown>
) => {
  try {
    const headers: Record<string, string> = {};

    // Only set Content-Type for JSON data
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, {
      method,
      credentials: "include",
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
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
