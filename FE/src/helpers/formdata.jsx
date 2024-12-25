function convertToFormData(stateObject) {
  const formData = new FormData();
  for (const key in stateObject) {
    if (stateObject[key] instanceof File || typeof stateObject[key] !== "object") {
      formData.append(key, stateObject[key]);
    }
  }
  return formData;
}

export default convertToFormData;
