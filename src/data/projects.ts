/**
 * Active community projects shown on the /projects page.
 *
 * `banner` holds Tailwind gradient color stops (consumed alongside
 * `bg-gradient-to-br` in ProjectCard.astro), e.g. "from-primary-700 to-primary-400".
 * `icon` names a `@lucide/astro` icon — the page maps it to the imported component.
 */
export type ProjectStatus = 'active' | 'recruiting' | 'idea' | 'live';

export type ProjectIcon =
  | 'Radio'
  | 'Server'
  | 'Code'
  | 'BriefcaseBusiness'
  | 'Box'
  | 'Gauge';

export interface Project {
  title: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  tags: string[];
  meta: string;
  /** Tailwind gradient color stops for the card banner, e.g. "from-primary-700 to-primary-400". */
  banner: string;
  icon: ProjectIcon;
  /** Footer CTA label (defaults to "Get involved" in ProjectCard when omitted). */
  cta?: string;
}

export const projects: Project[] = [
  {
    title: 'KC Meshtastic Map',
    description:
      'Live map of LoRa mesh nodes across the metro. Bring a node online and extend the network.',
    status: 'live',
    statusLabel: 'Live map',
    tags: ['LoRa', 'ESP32'],
    meta: '23 nodes online',
    banner: 'from-primary-700 to-primary-400',
    icon: 'Radio',
  },
  {
    title: 'Community Homelab',
    description:
      'A shared self-hosting endpoint to spin up containers, learn Kubernetes, and break things safely.',
    status: 'recruiting',
    statusLabel: 'Recruiting',
    tags: ['Proxmox', 'K8s'],
    meta: '4 maintainers',
    banner: 'from-secondary-600 to-secondary-400',
    icon: 'Server',
  },
  {
    title: 'KC Open Data Dashboard',
    description:
      "Turning the city's open datasets into maps and charts residents can actually read.",
    status: 'active',
    statusLabel: 'Active',
    tags: ['React', 'D3'],
    meta: '6 contributors',
    banner: 'from-gray-800 to-gray-600',
    icon: 'Code',
  },
  {
    title: 'KC Tech Job Board',
    description:
      'A no-recruiter-spam board of local roles, posted by members and hiring managers we trust.',
    status: 'active',
    statusLabel: 'Active',
    tags: ['Astro', 'Supabase'],
    meta: 'posts weekly',
    banner: 'from-primary-600 to-secondary-400',
    icon: 'BriefcaseBusiness',
  },
  {
    title: '3D Print Co-op',
    description:
      'A shared print queue and parts library — submit an STL, pick it up at the next meetup.',
    status: 'recruiting',
    statusLabel: 'Recruiting',
    tags: ['OctoPrint', 'CAD'],
    meta: '2 printers',
    banner: 'from-primary-800 to-primary-500',
    icon: 'Box',
  },
  {
    title: 'Air Quality Sensors',
    description:
      'A proposed network of cheap PM2.5 sensors mapping air quality block-by-block. Looking for a lead.',
    status: 'idea',
    statusLabel: 'Idea',
    tags: ['Raspberry Pi'],
    meta: 'seeking a lead',
    banner: 'from-gray-700 to-gray-500',
    icon: 'Gauge',
    cta: 'Claim it',
  },
];
