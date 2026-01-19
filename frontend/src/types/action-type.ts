export interface ActionType {
  status: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  actions?: string[];
  timestamp: number;
}

export const INITIAL_TYPE: ActionType = {
  status: "IDLE",
  message: "",
  timestamp: 0
}