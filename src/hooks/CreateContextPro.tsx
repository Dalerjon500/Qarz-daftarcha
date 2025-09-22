import {useEffect, useReducer, type Dispatch, type ReactNode } from 'react'
import { MyContext } from '../context/MyContext';
import apiClient from '../apiClient/apiClient';
import type { Product, User } from '../types/types';

export interface ContextType {
    state: TypeState
    dispatch: Dispatch<Action>
}

export interface TypeState {
    user: User | null,
    isLoading: boolean,
    cart: Product[]
}

type SETAction = { type: "SET_USER", payload: User }
type LOGOUTAction = { type: "LOGOUT" }
type SETLoadingAction = { type: "SET_LOADING", payload: boolean }
type EDITUserAction = { type: "EDIT_USER", payload: Partial<User> }
type CHANGE_PASSWORDAction = { type: "CHANGE_PASSWORD", payload: string }
type AddUserAction = { type: "ADD_USER" }
type REMOVE_FROM_CARTAction = { type: "REMOVE_FROM_CART", payload: string }
type ADD_TO_CARTAction = { type: "ADD_TO_CART", payload: Product }

type Action = SETAction | LOGOUTAction | SETLoadingAction | EDITUserAction | CHANGE_PASSWORDAction | AddUserAction | REMOVE_FROM_CARTAction | ADD_TO_CARTAction


export interface ContextType {
    state: TypeState
    dispatch: Dispatch<Action>
}


function reducer(state: TypeState, action: Action): TypeState {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload as User }
        case "LOGOUT":
            return { ...state, user: null }
        case 'EDIT_USER':
            return { ...state, user: { ...state.user, ...action.payload } as User };
        case "CHANGE_PASSWORD":
            return { ...state, user: { ...state.user, password: action.payload } as User };
        case "SET_LOADING":
            console.log("loading", action.payload)
            return { ...state, isLoading: action.payload as boolean }
         case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, action.payload] }
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((p) => p.id !== action.payload) }
        default:
            return state;
    }
}

function CreateContextPro({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        isLoading : true,
        cart: JSON.parse(localStorage.getItem("cart") || "[]") as Product[]
    })



    useEffect(() => {
        fetchUser()
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state.cart])

    const fetchUser = async () => {
        const token = localStorage.getItem("token")
        apiClient.get<User>("/users/" + token).then(res => {
            dispatch({ type: "SET_USER", payload: res.data })
        }).catch(err => {
            console.log(err)
        }).finally(() => {                
            dispatch({ type: "SET_LOADING", payload: false })
        })
    }


    return (
        <MyContext.Provider value={{ state, dispatch }} >
            {children}
        </MyContext.Provider>
    )
}

export default CreateContextPro