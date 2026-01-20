export interface ActionType<T = null> {
  status: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  payload: T;
  actions?: string[];
  timestamp: number;
  errors?: any;
}