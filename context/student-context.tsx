import { STUDENTS } from "@/data/students";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  StudentAction,
  studentReducer,
  StudentState,
} from "./student-reducer";

interface StudentsContextValue {
  students: StudentState;
  dispatch: React.Dispatch<StudentAction>;
  isLoading: boolean;
}

const StudentsContext = createContext<StudentsContextValue | null>(null);

const STORAGEKEY = "@student_directory";

interface StudentsProviderProps {
  children: ReactNode;
}

export function StudentsProvider({ children }: StudentsProviderProps) {
  const [students, dispatch] = useReducer(studentReducer, STUDENTS);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load students from AsyncStorage
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGEKEY);

        if (raw) {
          const saved = JSON.parse(raw) as StudentState;
          dispatch({
            type: "LOAD",
            payload: saved,
          });
        }
      } catch (err) {
        console.error(
          "Failed to load students from storage:",
          err
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Save students whenever state changes
  useEffect(() => {
    if (isLoading) return;

    const saveStudents = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGEKEY,
          JSON.stringify(students)
        );
      } catch (err) {
        console.error(
          "Failed to save students to storage:",
          err
        );
      }
    };

    saveStudents();
  }, [students, isLoading]);

  return (
    <StudentsContext.Provider
      value={{
        students,
        dispatch,
        isLoading,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents(): StudentsContextValue {
  const ctx = useContext(StudentsContext);

  if (!ctx) {
    throw new Error(
      "useStudents must be used inside a StudentsProvider"
    );
  }

  return ctx;
}