"use server";

interface FetchClientProps {
  path: string,
  host?: string,
  init?: RequestInit
}

export async function fetchClient({ path, host, init }: FetchClientProps) {
  const API_URL = host ?? process.env.API_URL;
  
  return await fetch(`${API_URL + path}`, init);
}