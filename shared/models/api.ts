export interface ApiResponse<T> {
  status: "success" | "warn" | "info" | "error";
  message: string;
  data: T;
}
