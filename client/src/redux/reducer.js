const initialState = {
  files: [],
  allFiles : [],
  oneFile : []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FILTERED_FILES":
      return {
        ...state,
        files: action.payload,
      };
      case "ALL_FILES":
        return {
          ...state,
          allFiles: action.payload,
        };
        case "ONE_FILE":
          return {
            ...state,
            oneFile: action.payload,
          };
    default:
      return state;
  }
}
