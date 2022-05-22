export interface ActionType {
  type: string,
  payload: any
}

const initState = {
  blogList: [],
  isLoadedBlogList: false
}

const rootReducer = (state = initState, action: ActionType) => {
  switch(action.type) {
    case 'blogList/viewBlogList': {
      return {
        ...state,
        isLoadedBlogList: true,
        blogList: action.payload
      }
    }
    case 'blogList/viewDetail': {
      return {
        ...state
      }
    }
    default: return state
  }
}

export default rootReducer