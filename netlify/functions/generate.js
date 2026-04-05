exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    
    const { fal } = await import("@fal-ai/client");
    
    fal.config({ credentials: process.env.FAL_KEY });

    const result = await fal.subscribe("fal-ai/kling-video/v1.6/standard/text-to-video", {
      input: {
        prompt: prompt,
        duration: "5",
        aspect_ratio: "16:9"
      }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video_url: result.data.video.url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
