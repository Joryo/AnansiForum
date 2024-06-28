import queryString from "querystring";

import { ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class Api {
  static async get(
    path: string,
    searchParams?: queryString.ParsedUrlQueryInput | undefined,
  ): Promise<ApiResponse> {
    return this.fetchApi(
      `${path}${searchParams ? `?${queryString.stringify(searchParams)}` : ""}`,
      "GET",
      null,
    );
  }

  static async post(path: string, data: any) {
    return this.fetchApi(path, "POST", data);
  }

  static async put(path: string, data: any) {
    return this.fetchApi(path, "PUT", data);
  }

  static async delete(path: string) {
    return this.fetchApi(path, "DELETE", null);
  }

  /**
   * Method to authenticate the user, register access token and user data in local storage
   * Save refresh token in cookie
   * @param username - username
   * @param password - user password
   * @returns user
   * @throws Error
   */
  static async auth(username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const accessToken = res.headers.get("X-Access-Token") || "";

    localStorage.setItem("accessToken", accessToken);

    const user = await res.json();

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  }

  /**
   * Method to refresh the access token when it expires
   * The refresh token is sent in the cookie (credentials: include)
   * Save the new access token in local storage
   * @throws Error
   */
  private static async refreshToken() {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const newAccessToken = res.headers.get("X-Access-Token") || "";

    localStorage.setItem("accessToken", newAccessToken);
  }

  /**
   * Method to fetch the API with access token
   * If the request fails with 401, it tries to refresh the access token one time
   * @param path - API path
   * @param method - HTTP method
   * @param data - request body
   * @param retry - flag to indicate if the request is a retry
   * @returns
   * @throws Error
   */
  private static async fetchApi(
    path: string,
    method: string,
    data: any,
    retry = false,
  ): Promise<ApiResponse> {
    const request: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    if (data) {
      request.body = JSON.stringify(data);
    }

    const res = await fetch(`${API_URL}${path}`, request);

    if (res.status === 401 && !retry) {
      await this.refreshToken();

      return this.fetchApi(path, method, data, true);
    }

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const totalCount = parseInt(res.headers.get("X-Total-Count") || "0", 10);

    if (res.status === 204) {
      return { data: null, totalCount };
    }
    const responseData = await res.json();

    return { data: responseData, totalCount };
  }
}

export default Api;
