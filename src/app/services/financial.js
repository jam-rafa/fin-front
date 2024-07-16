 const getMounthChart = async () => {
    try {
      const response = await Api.get("/finance");
      return response;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return null;
    }
  };
  
export default getMounthChart