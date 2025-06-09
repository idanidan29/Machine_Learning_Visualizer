export const socialLinks = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername'
} as const;

export type SocialLinkType = keyof typeof socialLinks; 