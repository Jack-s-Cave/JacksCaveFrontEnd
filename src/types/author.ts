type SocialMedia = {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
}

export interface Author {
  id: number
  name: string
  bio: string
  createdAt: string
  socialMedia?: SocialMedia
}
