"use server";

import { HttpException } from "@/exceptions/http-exception";
import { RequiredActionException } from "@/exceptions/required-action-exception";

interface FetchClientProps {
  path: string,
  host?: string,
  init?: RequestInit
}

export async function fetchClient({ path, host, init }: FetchClientProps) {
  const API_URL = host ?? process.env.API_URL;
  
  const response = await fetch(`${API_URL + path}`, {
    ...init
  });

  if (response.ok) {
    return response;
  }

  let errorData;
  try {
    errorData = await response.json();
  } catch (error) {
    errorData = null;
  }

  switch (response.status) {
    case 409:
      verifyRequiredAction(await errorData);
    default:
      throw new HttpException(500, "Internal Error", "Internal Error");
  }
}

function verifyRequiredAction(errorData?: RequiredActionException) {
  if (errorData && errorData.actions) {
    throw new RequiredActionException(errorData.actions, errorData.description, errorData.name);
  }

  throw new HttpException(500, "Internal Error", "Internal Error");
}