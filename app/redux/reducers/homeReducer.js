import actionType from "../actions/actionType";

const initialState = {
    data: [],
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_DATA:
            return { ...state, data: [...state.data, action.payload.item] };
        case actionType.UPDATE_DATA:
            return { ...state, ...action.payload.data };
        case actionType.REMOVE_DATA:
            return { data: [] };
        default: {
            return state;
        }
    }
};

export default homeReducer;
