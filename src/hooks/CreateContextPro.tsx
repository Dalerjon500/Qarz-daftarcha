import {useEffect, useReducer, type Dispatch, type ReactNode } from 'react'
import { MyContext } from '../context/MyContext';
import apiClient from '../apiClient/apiClient';
import type { User } from '../types/types';

export interface ContextType {
    state: TypeState
    dispatch: Dispatch<Action>
}

export interface TypeState {
    user: User | null,
    isLoading: boolean,
    users: User[]
}

type SETAction = { type: "SET_USER", payload: User }
type LOGOUTAction = { type: "LOGOUT" }
type SETLoadingAction = { type: "SET_LOADING", payload: boolean }
type EDITUserAction = { type: "EDIT_USER", payload: Partial<User> }
type CHANGE_PASSWORDAction = { type: "CHANGE_PASSWORD", payload: string }
type AddUserAction = { type: "ADD_USER" }


type Action = SETAction | LOGOUTAction | SETLoadingAction | EDITUserAction | CHANGE_PASSWORDAction | AddUserAction


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
        case "ADD_USER":
            return { ...state, users: [...state.users, 
                { id: state.users.length + 1, name: `Muslima ${state.users.length + 1}` , username: "Mary", email: "muslima@example.com", phone: "684273468122803" }] }
        default:
            return state
    }
}

function CreateContextPro({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        isLoading : true,
        users:[
            {
                id: 1,
                name: "Leanne Graham",
                username: "Bret",
                email: "jKt5l@example.com",
                phone: "1-770-736-8031 x56442"
            },
            {
                id: 2,
                name: "Ervin Howell",
                username: "Antonette",
                email: "4dDxW@example.com",
                phone: "010-692-6593 x09125"
            } 
        ]
    })


    useEffect(() => {
        const token = localStorage.getItem("token")
        apiClient.get<User>("/users/" + token).then(res => {
            dispatch({ type: "SET_USER", payload: res.data })
        }).catch(err => {
            console.log(err)
        }).finally(() => {                
            dispatch({ type: "SET_LOADING", payload: false })
        })
    }, [])


    return (
        <MyContext.Provider value={{ state, dispatch }} >
            {children}
        </MyContext.Provider>
    )
}

export default CreateContextPro