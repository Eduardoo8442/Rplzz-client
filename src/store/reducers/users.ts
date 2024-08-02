interface State {
    setUsers: Users | null;
  }
  type Users = {
    name: string;
    image: string;
    id: string;
};
  const initialState: State = {
    setUsers: null,
  };
  
  interface Action {
    type: string;
    payload?: Users; 
  }
  
  const setUsersReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case 'USERS':
        return {
          ...state,
          setUsers: action.payload ?? null,
        };
      default:
        return state;
    }
  };
  
  export default setUsersReducer;
  