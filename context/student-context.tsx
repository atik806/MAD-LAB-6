import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { Student, STUDENTS } from "@/data/students";
import { studentReducer, StudentAction, StudentState } from "./student-reducer";

interface StudentsContextValue {
  students: StudentState;
  dispatch: React.Dispatch<StudentAction>;
}

const StudentsContext = createContext<StudentsContextValue | null>(null);

interface StudentsProviderProps {
  children: ReactNode;
}

export function StudentsProvider({ children }: StudentsProviderProps) {
  const [students, dispatch] = useReducer(studentReducer, STUDENTS);

  return (
    <StudentsContext.Provider value={{ students, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents(): StudentsContextValue {
  const ctx = useContext(StudentsContext);
  if (!ctx) {
    throw new Error("useStudents must be used inside a StudentsProvider");
  }
  return ctx;
}
