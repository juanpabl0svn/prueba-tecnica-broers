import { URL } from "./config";

export const handleSpaces = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/\s/g, "");
};

export const POST = async (endpoint: string, body: any) => {
  try {
    const req = await fetch(`${URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();

    if (!req.ok) throw new Error(res.error);

    return res;
  } catch (error) {
    return { error };
  }
};

export const PATCH = async (endpoint: string, body: any) => {
  try {
    const req = await fetch(`${URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();

    if (!req.ok) return { error: res.message };

    return res;
  } catch (error) {
    return { error };
  }
};

export const DELETE = async (endpoint: string) => {
  try {
    const req = await fetch(`${URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await req.json();

    if (!req.ok) return { error: res.message };

    return res;
  } catch (error) {
    return { error };
  }
};
