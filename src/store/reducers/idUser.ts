interface State {
    setIdUser: string | null;
  }
  
  const initialState: State = {
    setIdUser: null,
  };
  
  interface Action {
    type: string;
    payload?: string; 
  }
  
  const setIdUserReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case 'ID':
        return {
          ...state,
          setIdUser: action.payload ?? null,
        };
      default:
        return state;
    }
  };
  
  export default setIdUserReducer;
  