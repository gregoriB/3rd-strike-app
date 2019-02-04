const switchChar = (
  state = {
    currentChar: false
  }, action) => {
    switch(action.type) {
      case 'SWITCH_CHAR':
        state = {
          ...state,
          currentChar: action.payload
        }
        break;
      default:
        break;
    }

  return state;
}

export default switchChar;