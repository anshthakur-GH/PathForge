import { GoogleGenerativeAI } from '@google/generative-ai';

// Add logging to check if API key is loaded
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error('Gemini API key is not found in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export interface GeneratedResume {
  name: string;
  summary: string;
  skills: string[];
  experience: Array<{
    job_title: string;
    company: string;
    dates: string;
    responsibilities: string[];
  }>;
  education: string[];
  certifications: string[];
  projects: string[];
}

// Helper function to clean JSON response
const cleanJsonResponse = (response: string): string | null => {
  try {
    // Remove any markdown code block indicators
    let cleaned = response.replace(/```json\n?|\n?```/g, '');
    
    // Remove any leading/trailing whitespace
    cleaned = cleaned.trim();
    
    // Try to parse to validate JSON
    JSON.parse(cleaned);
    
    return cleaned;
  } catch (error) {
    console.error('Error cleaning JSON response:', error);
    return null;
  }
};

export const generateResumeFromPrompt = async (prompt: string, targetJobTitle?: string): Promise<GeneratedResume> => {
  try {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    console.log('Starting resume generation...');
    console.log('Prompt:', prompt);
    console.log('Target job title:', targetJobTitle);

    const systemPrompt = `You are a professional resume writer and career coach. Your task is to create a perfect, ATS-friendly resume from the user's self-description.

IMPORTANT: You must respond with ONLY a valid JSON object, no other text. The JSON must follow this exact structure:
{
  "name": "Full Name",
  "summary": "Professional summary (3-4 sentences)",
  "skills": ["Skill 1", "Skill 2", ...],
  "experience": [
    {
      "job_title": "Job Title",
      "company": "Company Name",
      "dates": "Duration",
      "responsibilities": ["Responsibility 1", "Responsibility 2", ...]
    }
  ],
  "education": ["Education 1", "Education 2", ...],
  "certifications": ["Certification 1", "Certification 2", ...],
  "projects": ["Project 1", "Project 2", ...]
}

Guidelines:
- Make the resume ATS-friendly
- Use strong action verbs
- Quantify achievements where possible
- Include relevant keywords
- Follow reverse-chronological order
- Tailor for the target job title if provided
- If information is missing, make reasonable assumptions based on the context
- Ensure all arrays are properly formatted with square brackets
- Ensure all strings are properly quoted
- Do not include any text outside the JSON object`;

    const userPrompt = targetJobTitle
      ? `Create an ATS-friendly resume for a ${targetJobTitle} position based on this description: ${prompt}`
      : `Create an ATS-friendly resume based on this description: ${prompt}`;

    console.log('Sending request to Gemini...');
    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = result.response.text();
    console.log('Received response from Gemini:', response);
    
    // Clean and parse the response
    const cleanedResponse = cleanJsonResponse(response);
    if (!cleanedResponse) {
      console.error('Failed to clean JSON response');
      throw new Error('Failed to generate valid resume data');
    }

    console.log('Cleaned response:', cleanedResponse);
    const parsedResponse = JSON.parse(cleanedResponse);
    console.log('Successfully parsed response:', parsedResponse);

    return parsedResponse;
  } catch (error) {
    console.error('Error generating resume:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate resume: ${error.message}`);
    }
    throw new Error('Failed to generate resume. Please try again.');
  }
};

export const analyzeJobDescription = async (jobDescription: string): Promise<{
  keywords: string[];
  requiredSkills: string[];
  suggestedImprovements: string[];
}> => {
  try {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    const prompt = `Analyze this job description and provide insights in JSON format:
${jobDescription}

IMPORTANT: Respond with ONLY a valid JSON object following this structure:
{
  "keywords": ["keyword1", "keyword2", ...],
  "requiredSkills": ["skill1", "skill2", ...],
  "suggestedImprovements": ["improvement1", "improvement2", ...]
}

Guidelines:
- Extract key technical and soft skills
- Identify important keywords for ATS
- Suggest specific improvements to make the resume more relevant
- Keep suggestions actionable and specific
- Ensure all arrays are properly formatted
- Do not include any text outside the JSON object`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    const cleanedResponse = cleanJsonResponse(response);
    if (!cleanedResponse) {
      throw new Error('Failed to analyze job description');
    }

    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error('Error analyzing job description:', error);
    throw new Error('Failed to analyze job description. Please try again.');
  }
};

export const enhanceResumeSection = async (
  section: string,
  content: string,
  targetJobTitle?: string
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    const prompt = `Enhance the following ${section} section of a resume${targetJobTitle ? ` for a ${targetJobTitle} position` : ''}. Focus on:
1. Using strong action verbs
2. Quantifying achievements
3. Including relevant keywords
4. Making it concise but impactful
5. Ensuring ATS compatibility

Content to enhance:
${content}

IMPORTANT: Respond with ONLY the enhanced content, no additional text or formatting.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response.trim();
  } catch (error) {
    console.error('Error enhancing resume section:', error);
    throw new Error('Failed to enhance resume section. Please try again.');
  }
}; 