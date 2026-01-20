export interface ActionType<T = null> {
  status: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  payload: T;
  actions?: string[];
  timestamp: number;
  errors?: any[];
}

export const INITIAL_TYPE: ActionType = {
  status: "IDLE",
  message: "",
  payload: null,
  timestamp: 0
}