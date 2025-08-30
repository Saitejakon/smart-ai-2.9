import { UploadedFile } from "@/contexts/StudyMateContext";

// Simulated document content for different types of PDFs
const sampleContents = {
  math: `This document covers advanced calculus concepts including derivatives, integrals, and differential equations. Key topics include:
- Limit theory and continuity
- Rules of differentiation
- Integration techniques
- Applications in physics and engineering`,
  
  science: `This scientific paper discusses cellular biology and molecular processes. Main sections cover:
- Cell structure and organelles
- DNA replication and transcription
- Protein synthesis pathways
- Metabolic processes and energy production`,
  
  history: `This historical document examines the causes and consequences of major world events. Topics include:
- Political movements and revolutions
- Economic factors and social changes
- Cultural developments and their impact
- Timeline of significant events`,
  
  literature: `This literary analysis explores themes, characters, and narrative techniques. Key elements:
- Character development and motivations
- Symbolic meanings and metaphors
- Historical and cultural context
- Writing style and literary devices`,
  
  general: `This document contains educational content covering various academic topics. The material includes:
- Fundamental concepts and principles
- Practical applications and examples
- Review questions and exercises
- Additional reading suggestions`
};

export const generateAIResponse = (userQuestion: string, availableFiles: UploadedFile[]): string => {
  const question = userQuestion.toLowerCase();
  
  // If no files are available
  if (availableFiles.length === 0) {
    return "I'd love to help you with that question! However, I don't see any uploaded documents yet. Please upload a PDF file first, and I'll be able to analyze its content to provide you with accurate, contextual answers.";
  }

  // Determine the type of question and respond accordingly
  if (question.includes('math') || question.includes('calculus') || question.includes('equation')) {
    return `Great math question! Based on your uploaded documents, here's what I can explain:

The mathematical concepts in your materials show that this involves step-by-step problem solving. Let me break this down:

1. **First, identify the key variables** - Look at what information you're given
2. **Apply the relevant formula** - Use the appropriate mathematical principle
3. **Solve systematically** - Work through each step carefully
4. **Verify your answer** - Check if the result makes sense

${availableFiles.length > 0 ? `Source: ${availableFiles[0].name}` : ''}

Would you like me to explain any specific part in more detail?`;
  }

  if (question.includes('what') || question.includes('define') || question.includes('explain')) {
    return `Excellent question! From the content in your uploaded documents, I can provide a comprehensive explanation:

This concept is fundamentally important because it establishes the foundation for understanding the broader topic. Here are the key points:

• **Definition**: The core meaning relates to the fundamental principles discussed in your materials
• **Context**: This fits into the larger framework of the subject matter
• **Applications**: You can apply this knowledge in practical scenarios
• **Examples**: Real-world instances help clarify the concept

${availableFiles.length > 0 ? `Referenced from: ${availableFiles[0].name}` : ''}

This explanation is based on the specific content from your uploaded study materials. Is there a particular aspect you'd like me to elaborate on?`;
  }

  if (question.includes('how') || question.includes('process') || question.includes('steps')) {
    return `Perfect procedural question! According to your study materials, here's the step-by-step process:

**Step 1: Preparation**
Start by understanding the prerequisites and gathering necessary information.

**Step 2: Implementation**
Follow the systematic approach outlined in your documents.

**Step 3: Analysis**
Evaluate the results and check for accuracy.

**Step 4: Application**
Apply the knowledge to similar problems or scenarios.

${availableFiles.length > 0 ? `Process detailed in: ${availableFiles[0].name}` : ''}

This methodology is specifically referenced from your uploaded materials. Would you like me to expand on any particular step?`;
  }

  if (question.includes('why') || question.includes('reason') || question.includes('cause')) {
    return `Insightful question about causation! Your study materials provide several explanations for this:

**Primary Reasons:**
The main factors contributing to this are rooted in the fundamental principles covered in your documents.

**Supporting Evidence:**
Your materials present data and examples that support these explanations.

**Historical Context:**
Understanding the background helps explain why this occurs.

**Implications:**
This knowledge connects to other concepts in your study materials.

${availableFiles.length > 0 ? `Analysis based on: ${availableFiles[0].name}` : ''}

This reasoning comes directly from your uploaded documents. Would you like me to explore any specific aspect further?`;
  }

  // Default response for other questions
  return `That's a thoughtful question! Based on my analysis of your uploaded documents, I can provide relevant insights:

Your study materials contain information that directly relates to this topic. The content suggests multiple approaches to understanding this concept, each offering valuable perspectives.

Key insights from your documents:
• The fundamental principles are clearly established
• Practical applications are demonstrated through examples
• The relationship to other topics is well-documented
• Additional resources are suggested for deeper learning

${availableFiles.length > 0 ? `Information sourced from: ${availableFiles[0].name}` : ''}

This response is tailored to the specific content in your uploaded study materials. What particular aspect would you like me to focus on next?`;
};

export const getDocumentType = (filename: string): keyof typeof sampleContents => {
  const name = filename.toLowerCase();
  if (name.includes('math') || name.includes('calculus') || name.includes('algebra')) return 'math';
  if (name.includes('science') || name.includes('biology') || name.includes('chemistry') || name.includes('physics')) return 'science';
  if (name.includes('history') || name.includes('historical')) return 'history';
  if (name.includes('literature') || name.includes('english') || name.includes('novel')) return 'literature';
  return 'general';
};

export const extractSimulatedContent = (filename: string): string => {
  const docType = getDocumentType(filename);
  return sampleContents[docType];
};