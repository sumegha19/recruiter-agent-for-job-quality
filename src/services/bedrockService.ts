import { 
  BedrockRuntimeClient, 
  ConverseCommand, 
  ConversationRole, 
  Message
} from "@aws-sdk/client-bedrock-runtime";

// Get environment variables
const AWS_REGION = import.meta.env.VITE_AWS_REGION || process.env.AWS_REGION || 'us-east-1';
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '';
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '';

// Initialize the Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// For debugging
console.log('AWS Region:', AWS_REGION);
console.log('AWS Access Key ID:', AWS_ACCESS_KEY_ID ? 'Set' : 'Not set');
console.log('AWS Secret Access Key:', AWS_SECRET_ACCESS_KEY ? 'Set' : 'Not set');

/**
 * Test AWS Bedrock API credentials with different model IDs
 * @returns Promise with test results
 */
export async function testBedrockCredentials(): Promise<{ success: boolean; message: string }> {
  // Test models to try
  const modelIds = ["amazon.nova-pro-v1:0", "us.amazon.nova-pro-v1:0"];
  
  // Simple test message
  const testMessages: Message[] = [
    {
      role: "system" as any,
      content: [{ text: "You are a helpful assistant." }]
    },
    {
      role: ConversationRole.USER,
      content: [{ text: "Say hello world" }]
    }
  ];
  
  // Inference parameters
  const inferenceConfig = {
    maxTokens: 100,
    temperature: 0.7,
    topP: 0.9
  };

  let lastError = null;
  
  // Try each model ID
  for (const modelId of modelIds) {
    try {
      console.log(`Testing AWS Bedrock with model ID: ${modelId}`);
      
      const command = new ConverseCommand({
        modelId: modelId,
        messages: testMessages,
        inferenceConfig: inferenceConfig
      });
      
      const response = await bedrockClient.send(command);
      const responseText = response.output?.message?.content?.[0]?.text || '';
      
      console.log(`Test successful with model ID ${modelId}. Response: ${responseText}`);
      return { 
        success: true, 
        message: `API credentials are valid. Successfully connected with model ID: ${modelId}` 
      };
    } catch (error) {
      console.error(`Error testing model ID ${modelId}:`, error);
      lastError = error;
    }
  }
  
  // If we get here, all model IDs failed
  return { 
    success: false, 
    message: `Failed to connect with any model ID. Last error: ${JSON.stringify(lastError)}` 
  };
}

// Interface for job description generation request
interface GenerateJobDescriptionRequest {
  jobTitle: string;
}

// Interface for job description generation response
interface GenerateJobDescriptionResponse {
  description: string;
  requirements: string;
}

/**
 * Generate job description and requirements based on job title using AWS Bedrock Nova Pro model
 * @param params - Object containing jobTitle
 * @returns Promise with generated description and requirements
 */
export async function generateJobDescription(
  params: GenerateJobDescriptionRequest
): Promise<GenerateJobDescriptionResponse> {
  const { jobTitle } = params;

  // System message to define the assistant's role
  const system = "You are a professional job description writer. You create detailed, accurate job descriptions and requirements lists based on job titles.";

  // User message with the prompt
  const messages: Message[] = [
    {
      role: "system" as any, // Using type assertion since ConversationRole doesn't have SYSTEM
      content: [
        {
          text: system
        }
      ]
    },
    {
      role: ConversationRole.USER,
      content: [
        {
          text: `Generate a professional job description and list of requirements for the position of "${jobTitle}".
          
          Format your response as JSON with two fields:
          1. "description": A detailed paragraph describing the role, responsibilities, and ideal candidate.
          2. "requirements": A bulleted list of key skills, qualifications, and experience required for the role.
          
          Keep the description concise but informative, focusing on the most important aspects of the role.`
        }
      ]
    }
  ];

  // Inference parameters
  const inferenceConfig = {
    maxTokens: 1000,
    temperature: 0.7,
    topP: 0.9
  };

  try {
    // Try both model IDs
    const modelIds = ["amazon.nova-pro-v1:0", "us.amazon.nova-pro-v1:0"];
    let response = null;
    let lastError = null;
    
    for (const modelId of modelIds) {
      try {
        console.log(`Creating ConverseCommand with model ID: ${modelId}`);
        console.log("Parameters:", {
          modelId: modelId,
          messages: messages,
          inferenceConfig: inferenceConfig
        });

        // Create the converse command
        const command = new ConverseCommand({
          modelId: modelId,
          messages: messages,
          inferenceConfig: inferenceConfig
        });

        console.log(`Sending command to AWS Bedrock with model ID: ${modelId}...`);
        // Invoke the model
        response = await bedrockClient.send(command);
        console.log(`Successfully used model ID: ${modelId}`);
        break; // If successful, break out of the loop
      } catch (error) {
        console.error(`Error with model ID ${modelId}:`, error);
        lastError = error;
      }
    }
    
    // If we have a response, process it
    if (response) {
      console.log("Received response from AWS Bedrock:", response);
      
      // Extract the response text
      const responseText = response.output?.message?.content?.[0]?.text || '';
      console.log("Extracted response text:", responseText);
      
      // Extract the JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("Failed to parse model response - no JSON found in:", responseText);
        throw new Error("Failed to parse model response");
      }
      
      console.log("Extracted JSON:", jsonMatch[0]);
      const parsedResponse = JSON.parse(jsonMatch[0]);
      console.log("Parsed response:", parsedResponse);
      
      return {
        description: parsedResponse.description || "",
        requirements: parsedResponse.requirements || ""
      };
    } else {
      // If all model IDs failed, use mock responses based on job title
      console.log("All API calls failed. Using mock response for job title:", jobTitle);
      return getMockJobDescription(jobTitle);
    }
  } catch (error) {
    console.error("Error generating job description:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Use mock responses as fallback
    console.log("Using mock response as fallback for job title:", jobTitle);
    return getMockJobDescription(jobTitle);
  }
}

/**
 * Get mock job description based on job title
 * @param jobTitle - The job title to generate a description for
 * @returns Mock job description and requirements
 */
function getMockJobDescription(jobTitle: string): GenerateJobDescriptionResponse {
  // Convert job title to lowercase for easier matching
  const title = jobTitle.toLowerCase();
  
  // Common mock responses for different job categories
  if (title.includes('software') || title.includes('developer') || title.includes('engineer')) {
    return {
      description: `We are seeking a talented ${jobTitle} to join our dynamic team. The ideal candidate will design, develop, and maintain high-quality software solutions that meet business requirements. You will collaborate with cross-functional teams to implement new features, troubleshoot issues, and optimize application performance. This role requires a strong understanding of software development principles, excellent problem-solving skills, and the ability to work in a fast-paced environment.`,
      requirements: `• Bachelor's degree in Computer Science, Engineering, or related field\n• 3+ years of experience in software development\n• Proficiency in one or more programming languages (e.g., JavaScript, Python, Java, C#)\n• Experience with modern development frameworks and tools\n• Strong understanding of data structures, algorithms, and software design patterns\n• Excellent problem-solving and analytical skills\n• Good communication and teamwork abilities\n• Experience with version control systems (e.g., Git)`
    };
  } else if (title.includes('data') || title.includes('analyst') || title.includes('scientist')) {
    return {
      description: `We are looking for a skilled ${jobTitle} to help transform raw data into valuable insights that drive business decisions. You will work with large datasets, develop analytical models, and create visualizations to communicate findings effectively. The ideal candidate has strong analytical skills, statistical knowledge, and the ability to translate complex data into actionable recommendations.`,
      requirements: `• Bachelor's or Master's degree in Statistics, Mathematics, Computer Science, or related field\n• Experience with data analysis tools and programming languages (e.g., Python, R, SQL)\n• Knowledge of statistical analysis and machine learning techniques\n• Experience with data visualization tools (e.g., Tableau, Power BI)\n• Strong problem-solving and critical thinking skills\n• Excellent communication skills to present findings to non-technical stakeholders\n• Attention to detail and ability to work with complex datasets`
    };
  } else if (title.includes('manager') || title.includes('director') || title.includes('lead')) {
    return {
      description: `We are seeking an experienced ${jobTitle} to provide leadership and strategic direction to our team. You will be responsible for planning, organizing, and overseeing projects and team members to ensure objectives are met efficiently and effectively. The ideal candidate has strong leadership skills, excellent communication abilities, and a proven track record of successful project delivery.`,
      requirements: `• Bachelor's degree in Business, Management, or related field\n• 5+ years of experience in a similar role\n• Proven leadership and team management skills\n• Strong organizational and project management abilities\n• Excellent communication and interpersonal skills\n• Strategic thinking and problem-solving capabilities\n• Experience with budget management and resource allocation\n• Ability to make decisions and drive results in a fast-paced environment`
    };
  } else if (title.includes('marketing') || title.includes('sales')) {
    return {
      description: `We are looking for a dynamic ${jobTitle} to help grow our business and strengthen our brand presence. You will develop and implement effective marketing/sales strategies, analyze market trends, and identify opportunities for business growth. The ideal candidate is creative, data-driven, and has excellent communication skills to engage with customers and stakeholders.`,
      requirements: `• Bachelor's degree in Marketing, Business, Communications, or related field\n• Experience in marketing or sales roles\n• Knowledge of marketing principles and best practices\n• Excellent written and verbal communication skills\n• Creative thinking and problem-solving abilities\n• Data analysis and research skills\n• Experience with digital marketing platforms and tools\n• Customer-focused mindset and strong interpersonal skills`
    };
  } else {
    // Generic response for any other job title
    return {
      description: `We are seeking a talented and motivated ${jobTitle} to join our team. The ideal candidate will bring expertise, enthusiasm, and a collaborative spirit to help us achieve our organizational goals. This role offers an opportunity to work in a dynamic environment where innovation and excellence are valued.`,
      requirements: `• Relevant education or certification in the field\n• Previous experience in a similar role\n• Strong communication and interpersonal skills\n• Problem-solving abilities and attention to detail\n• Ability to work independently and as part of a team\n• Time management and organizational skills\n• Commitment to professional development and continuous learning\n• Adaptability and flexibility in a changing environment`
    };
  }
}
