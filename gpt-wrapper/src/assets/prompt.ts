export const Prompts = {
  SatisfactionUserPromptTemplate: `
        Given this profile: {profile}
        And the neighbouring profiles: {otherProfiles}
    `,
  SatisfactionSystemPrompt: `Act as an expert in computational linguistics and social sciences theory,
  From a rate of 1 to 10, provide a satisfaction rating that may be perceived by the person provided the profile with the neighbouring profiles:
  Return the response in the format: 
    {
        "satisfaction_rate": number[],
        "justification": string
    }`,
  AffinityUserPromptTemplate: `
        Given this profile: {profile}
        And the neighbouring profiles: {otherProfiles}
  `,
  AffinitySystemPrompt: `Act as an expert in computational linguistics and social sciences theory,
  From a rate of 1 to 10, provide the affinity of the said person with neighbouring profiles:
  Return the response in the format: 
    {
        "affinity_rate": number[],
        "justification": string
    }`,
};
