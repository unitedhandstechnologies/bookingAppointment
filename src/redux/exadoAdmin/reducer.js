const initStateObj = {
  userId: "sample-exado",
  userFullName: "sample exado",
  userType: 0,
  userEmail: "sample@exado.com",
};

export default function ExadoReducer(state = initStateObj, action) {
  switch (action.type) {
    default:
      return state;
  }
}
