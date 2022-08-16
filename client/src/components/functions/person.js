import axios from "axios";

export const createPerson = async (formData, authtoken, setUploadPercentage) =>
  await axios.post(`${process.env.REACT_APP_API}/person`, formData, {
    headers: {
      authtoken
    },
    onUploadProgress: progressEvent => {
      setUploadPercentage(
        parseInt(Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        ))
      )
    }
  });

export const getPersons = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/persons`, {
    headers: {
      authtoken,
    },
  });
};

export const removePerson = async (id, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/person/${id}`, {
    headers: {
      authtoken,
    },
  });
};

export const getPerson = async (id, authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/person/${id}`, {
    headers: {
      authtoken,
    },
  });
};

export const updatePerson = async (id, formData, authtoken, setUploadPercentage) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/person/${id}`,
    formData,
    {
      headers: {
        authtoken,
      },
      onUploadProgress: progressEvent => {
        setUploadPercentage(
          parseInt(Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          ))
        )
      }
    },
  );
};
