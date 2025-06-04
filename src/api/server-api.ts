type ServerApiFetchOptions = Omit<RequestInit, 'cache'> & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  cache?: 'force-cache' | 'no-store';
};

export async function serverApiFetch<T = unknown>(
  url: string,
  options?: ServerApiFetchOptions
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    next: options?.next,
    cache: options?.cache,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} — ${errorText}`);
  }

  return res.json() as Promise<T>;
}
