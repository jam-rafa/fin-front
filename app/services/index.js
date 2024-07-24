export const getExel = async () => {
  try {
    const response = await Api.get("/planilha");
    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};


export const getMock = async () => {
  try {
    const response = await Api.get("/dados-mockados");
    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};
