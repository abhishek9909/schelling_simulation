export interface IProfile {
  name: string;
  age: number;
  height: string;
  build: string;
  background: {
    origin: string;
    ethnicity: string;
    profession: string;
    education: string[];
  };
  personality: string[];
}

export interface ISatisfactionRequest {
  currentProfile: IProfile;
  neighbouringProfiles: IProfile[];
}

export const ChatRoles = {
  User: "user",
  System: "system",
  Assistant: "assistant",
};
