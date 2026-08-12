import { Student, STUDENTS } from "@/data/students";

export type StudentState = Student[];

export type StudentAction =
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "REMOVE_STUDENT"; payload: string }
  | { type: "RESET" };

export function studentReducer(
  state: StudentState,
  action: StudentAction
): StudentState {
  switch (action.type) {
    case "ADD_STUDENT":
      return [action.payload, ...state];
    case "REMOVE_STUDENT":
      return state.filter((s) => s.id !== action.payload);
    case "RESET":
      return STUDENTS;
    default:
      return state;
  }
}
