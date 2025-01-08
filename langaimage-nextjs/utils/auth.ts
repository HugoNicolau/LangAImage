export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const authTokenCookie = cookies.find((c) => c.startsWith("authToken="));
    return !!authTokenCookie;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

    window.location.href = "/login";
  }
}
