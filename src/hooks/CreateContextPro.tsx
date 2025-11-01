import { useEffect, useReducer, type Dispatch, type ReactNode } from "react";
import { MyContext } from "../context/MyContext";
import type {User } from "../types/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export interface ContextType {
  state: TypeState;
  dispatch: Dispatch<Action>;
}

export interface TypeState {
  user: User | null;
  isLoading: boolean;
}

type SETAction = { type: "SET_USER"; payload: User };
type LOGOUTAction = { type: "LOGOUT" };
type SETLoadingAction = { type: "SET_LOADING"; payload: boolean };
type AddUserAction = { type: "ADD_USER" };

type Action =
  | SETAction
  | LOGOUTAction
  | SETLoadingAction
  | AddUserAction

export interface ContextType {
  state: TypeState;
  dispatch: Dispatch<Action>;
}

function reducer(state: TypeState, action: Action): TypeState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload as User };
    case "LOGOUT":
      return { ...state, user: null };
    case "SET_LOADING":
      console.log("loading", action.payload);
      return { ...state, isLoading: action.payload as boolean };
    default:
      return state;
  }
}

function CreateContextPro({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isLoading: true,
  });


  useEffect(() => {
    const unsubscribe = fetchUser();
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (state.user?.roles.includes("ADMIN")) {
      return;
    }

    if (state.user?.roles.includes("WAITER")) {
      navigate("/waiter");
    }

    if (state.user?.roles.includes("CHEF")) {
      navigate("/chef");
    }
  }, [state.user?.email]);


  const fetchUser = () => {
    const auth = getAuth();
    const db = getFirestore();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch({ type: "SET_USER", payload: userData as User });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        } catch (err) {
          console.log(err);
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else {
        dispatch({ type: "LOGOUT" });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    });
    return unsub;
  };

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}

export default CreateContextPro;
