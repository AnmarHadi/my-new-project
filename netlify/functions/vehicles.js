exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify([
        { id: "1", number: "123", province: "بغداد" },
        { id: "2", number: "456", province: "البصرة" }
      ])
    };
  }
  return { statusCode: 404, body: "Not found" };
};
