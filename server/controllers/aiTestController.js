import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeText = async (req, res) => {
  const { text } = req.body;
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const systemPrompt = `
    You are a task-finding bot. Read the following text.
    The current date is: ${currentDate}.
    Does this text contain a task, an appointment, or a reminder with a specific date and time?
    If NO, return a JSON object with "taskFound": false.
    If YES, return a JSON object with "taskFound": true, "taskDescription": "...", and "dueDate": "YYYY-MM-DDTHH:MM:SSZ".
    
    Example 1: "I need to go to the store" -> {"taskFound": false}
    Example 2: "book flight ticket... day after tomorrow 10 pm" -> {"taskFound": true, "taskDescription": "Book flight ticket", "dueDate": "2025-11-05T22:00:00Z"}
    Example 3: "interview tomorrow at 12" -> {"taskFound": true, "taskDescription": "Interview", "dueDate": "2025-11-04T12:00:00Z"}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // Use the best model he has access to
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      response_format: { type: 'json_object' }, // Force JSON output
    });

    const aiResult = JSON.parse(response.choices[0].message.content);

    res.status(200).json({
      success: true,
      analysis: aiResult,
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    res.status(500).json({ success: false, message: 'AI analysis failed' });
  }
};