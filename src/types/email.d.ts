export interface EmailFormValues {
  emailType: string;
  recipient: string;
  subject: string;
  context: string;
  tone: string;
  length: string;
  additionalRequirements: string;
}

export interface EmailResult {
  subject: string;
  content: string;
  suggestions?: string[];
}

export interface EmailType {
  value: string;
  label: string;
  description: string;
  examples: string[];
}

export interface EmailTone {
  value: string;
  label: string;
  description: string;
}

export interface EmailLength {
  value: string;
  label: string;
  description: string;
} 