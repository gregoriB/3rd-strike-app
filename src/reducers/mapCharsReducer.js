const mapChars = (
  state = {
    charList: 'test'
  }, action) => {
    switch(action.type) {
      case 'MAP_CHARS':
        state = {
          ...state,
          charList: action.payload
        }
        break;
      default:
        break;
    }

  return state;
}

export default mapChars;