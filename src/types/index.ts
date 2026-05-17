export interface NavLink {
  label: string
  href: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  color: string
  tags: string[]
  href: string
}

export interface WorkItem {
  id: string
  title: string
  category: string
  description: string
  image: string
  gradient: string
  tags: string[]
  href: string
}

export interface StatItem {
  value: string
  label: string
  sublabel: string
}

export interface TechCategory {
  id: string
  category: string
  icon: string
  color: string
  techs: string[]
}

export interface AboutHighlight {
  icon: string
  title: string
  desc: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  initials: string
  color: string
  rating: number
  text: string
}

export interface FooterColumn {
  heading: string
  links: NavLink[]
}

export interface SocialLink {
  platform: string
  href: string
  icon: string
}

export interface ContactInfoCard {
  icon: string
  title: string
  value: string
}
