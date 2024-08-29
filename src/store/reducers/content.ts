interface State {
    setContent: boolean | null;
  }
  
  const initialState: State = {
    setContent: null,
  };
  
  interface Action {
    type: string;
    payload?: boolean; 
  }
  
  const setContentReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case 'CONTENT':
        return {
          ...state,
          setContent: action.payload ?? null,
        };
      default:
        return state;
    }
  };
  
  export default setContentReducer;
  