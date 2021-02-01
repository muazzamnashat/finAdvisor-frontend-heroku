// const ROOT_URL = "http://localhost:3000/api/v1";
const ROOT_URL = "https://finadvisorbackend.herokuapp.com/";

export function fetchCategories() {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_CATEGORIES_REQUEST" });
    fetch(`${ROOT_URL}/categories`, {
      method: "GET", // or 'PUT'
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        response.forEach((category) =>
          dispatch({ type: "ADD_CATEGORIES", payload: category })
        );
      });
  };
}
