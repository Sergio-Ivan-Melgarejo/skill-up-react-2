import { TASKS_SUCCESS, TASKS_REQUEST, TASKS_FAILURE } from "../types";

const initialState = {
    loading: false,
    tasks: [],
    error:""
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASKS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.peyload
            }
        case TASKS_FAILURE:
            return {
                loading: false,
                error: action.peyload,
                tasks: []
            }
        default:
            return state
    }
}