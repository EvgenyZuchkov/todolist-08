import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: Todolist[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    payload: {
        id: string
        filter: FilterValues
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state = initialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            const todolistId: string = action.payload.id
            return state.filter(el => el.id !== todolistId)
        }
        case 'ADD_TODOLIST': {
            const todolistId = v1()
            const newTodolist: Todolist = {id: todolistId, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            const todolistId: string = action.payload.id
            return state.map(el => el.id === todolistId ? {...el, title: action.payload.title} : el)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            const todolistId: string = action.payload.id
            return state.map(el => el.id === todolistId ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state

    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id,
        },
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
            type: 'ADD_TODOLIST',
            payload: {
                title,
            },
        } as const
}

export const changeTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id,
            title,
        },
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValues) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            id,
            filter,
        },
    } as const
}



