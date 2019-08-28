const page = "list";
  
  const pageReducer = (state = page, action) => {
    switch (action.type) {
      case 'otherPage':
        return state = action.payload;
      default:
        return state
    }
  };
  
  export default pageReducer;
  