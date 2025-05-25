export const login = async (data: { username: string; password: string }) => {
  const res = await fetch("/api/auth/login", {
    method: "PUT",
    body: JSON.stringify({
      ...data,
    }),
  });
  if (res.status === 401) {
    throw new Error();
  }
  return res;
};
