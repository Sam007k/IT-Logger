import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "./types";

export const getLogs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("http://localhost:5000/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

// Add Log
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("http://localhost:5000/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

// Delete Log
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`http://localhost:5000/logs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

// Update Log
export const updateLog = log => async (dispatch) => {
    try {
      setLoading();
     const res =  await fetch(`http://localhost:5000/logs/${log.id}`, {
        method: "PUT",
        body: JSON.stringify(log),
        headers: {
            'Content-type': 'application/json'
        }
      });

      const data = await res.json()
  
      dispatch({
        type: UPDATE_LOG,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.data,
      });
    }
  };

// Search server Logs
export const searchLogs = text => async (dispatch) => {
  try {
    setLoading();
   const res =  await fetch(`http://localhost:5000/logs?q=${text}`)
    const data = await res.json()

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

// Set Current Log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear Current Log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
