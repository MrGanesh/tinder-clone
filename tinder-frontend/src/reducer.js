export const initialState = {
    user: null,
    messages: null
}

const reducer = (state = initialState, action) => {
    console.log(action)

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'REMOVE_USER':
            return {
                ...state,
                user: null
            }
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.messages
            }
            Default:
            return state;
    }
}

export default reducer;