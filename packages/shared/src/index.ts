import { z } from 'zod'

export const LinkSchema = z.object({ label: z.string(), href: z.url() })

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  href: z.url().optional(),
  repo: z.url().optional(),
  year: z.number().int(),
})

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  start: z.string(), // "2023-04"
  end: z.string().nullable(), // null = present
  location: z.string().optional(),
  highlights: z.array(z.string()),
  href: z.url().optional(),
})

export const ProfileSchema = z.object({
  name: z.string(),
  handle: z.string(),
  title: z.string(),
  location: z.string(),
  bio: z.array(z.string()), // paragraphs
  email: z.email(),
  links: z.array(LinkSchema),
})

export const SiteContentSchema = z.object({
  profile: ProfileSchema,
  projects: z.array(ProjectSchema),
  experience: z.array(ExperienceSchema),
})

export type Link = z.infer<typeof LinkSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Experience = z.infer<typeof ExperienceSchema>
export type Profile = z.infer<typeof ProfileSchema>
export type SiteContent = z.infer<typeof SiteContentSchema>
