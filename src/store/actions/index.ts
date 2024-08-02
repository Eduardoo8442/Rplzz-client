export const content = (newDate: boolean) => {
    return {
      type: 'CONTENT',
      payload: newDate,
    };
  };
  export const idUser = (newDate: string) => {
    return {
      type: 'ID',
      payload: newDate,
    };
  };
  
  export const usersAction = (newDate: any) => {
    return {
      type: 'USERS',
      payload: newDate,
    };
  };
  