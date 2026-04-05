const fal = require("@fal-ai/client");

exports.handler = async (event) => {
  const { prompt } = JSON.parse(event.body);
  
  fal.config({ credentials: process.env.FAL_KEY });

  try {
    const result = await fal.subscribe("fal-ai/kling-video/v1.6/standard/text-to-video", {
      input: {
        prompt: prompt,
        duration: "5",
        aspect_ratio: "16:9"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ video_url: result.data.video.url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
