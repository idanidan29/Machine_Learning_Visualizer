export const socialLinks = {
  github: 'https://github.com/idanidan29/Machine_Learning_Visualizer',
  linkedin: 'https://www.linkedin.com/in/idan-levi-7a8506242'
} as const;

export type SocialLinkType = keyof typeof socialLinks; 