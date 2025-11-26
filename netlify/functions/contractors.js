exports.handler = async function(event, context) {
  if (event.httpMethod === "GET") {
    // بيانات المتعهدين (تجريبية، يمكنك تعديلها لاحقاً أو ربطها بقاعدة بيانات)
    const contractors = [
      { _id: "1", name: "شركة الرافدين" },
      { _id: "2", name: "مؤسسة النخبة" },
      { _id: "3", name: "مقاول الفردوس" }
    ];
    return {
      statusCode: 200,
      body: JSON.stringify(contractors)
    };
  }

  // يمكنك إضافة POST أو PUT أو DELETE حسب الحاجة هنا!

  return { statusCode: 404, body: "Not found" };
};
