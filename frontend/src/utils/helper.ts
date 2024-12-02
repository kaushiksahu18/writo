import { FreeAPISuccessResponseInterface } from "@/types/api";
import { AxiosResponse } from "axios";

export const isBrowser = typeof window !== "undefined";

export const requestHandler = async (
  api: () => Promise<AxiosResponse<FreeAPISuccessResponseInterface, any>>,
  setLoading: ((loading: boolean) => void) | null,
  onSuccess: (data: FreeAPISuccessResponseInterface) => void,
  onError: (error: string) => void
) => {
  // Show loading state if setLoading function is provided
  setLoading && setLoading(true);
  try {
    // Make the API request
    const response = await api();
    const { data } = response;
    // console.log(data)
    if (data?.statusCode) {
      // Call the onSuccess callback with the response data
      onSuccess(data);
    }
  } catch (error: any) {
    // Handle error cases, including unauthorized and forbidden cases
    if ([401, 403].includes(error?.response.data?.statusCode)) {
      // localStorage.clear(); // Clear local storage on authentication issues
      // if (isBrowser) window.location.href = "/signin"; // Redirect to login page
    }
    if (422 == error?.response.data?.statusCode) {
      const errorObject = new Object(error?.response?.data?.errors[0]);
      const message = Object.values(errorObject)[0];
      onError(
        message || error?.response?.data?.message || "Something went wrong"
      );
    } else {
      onError(error?.response?.data?.message || "Something went wrong");
    }
  } finally {
    // Hide loading state if setLoading function is provided
    setLoading && setLoading(false);
  }
};


export class LocalStorage {
    // Get a value from local storage by key
    static get(key: string) {
      if (!isBrowser) return;
      const value = localStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch (err) {
          return null;
        }
      }
      return null;
    }
  
    // Set a value in local storage by key
    static set(key: string, value: any) {
      if (!isBrowser) return;
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    // Remove a value from local storage by key
    static remove(key: string) {
      if (!isBrowser) return;
      localStorage.removeItem(key);
    }
  
    // Clear all items from local storage
    static clear() {
      if (!isBrowser) return;
      localStorage.clear();
    }
  }