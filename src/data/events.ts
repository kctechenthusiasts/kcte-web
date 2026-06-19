// Representative sample events — KCTE's live events are on Meetup; these power
// the detail-page template until a real data source is wired.

// Subset of Tag.astro's variants used by the sample events. Kept aligned with
// EventCard's `tags` prop so the featured card on /events stays type-compatible.
export type TagVariant =
  | 'workshop'
  | 'talk'
  | 'hacknight'
  | 'social'
  | 'online'
  | 'ghost';

export interface EventTag {
  label: string;
  variant: TagVariant;
}

export interface AgendaItem {
  time: string;
  title: string;
  detail: string;
}

export interface EventHost {
  name: string;
  role: string;
  initials: string;
}

export interface EventItem {
  slug: string;
  title: string;
  day: string;
  month: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  tags: EventTag[];
  lead: string;
  agenda: AgendaItem[];
  bring: string[];
  going: number;
  host: EventHost;
  free?: boolean;
}

export const events: EventItem[] = [
  {
    slug: 'intro-to-meshtastic',
    title: 'Intro to Meshtastic: Build Your First Node',
    day: '18',
    month: 'Jun',
    dateLabel: 'Thursday, June 18',
    timeLabel: '6:30 – 8:30 PM CDT',
    venue: 'Plexpod Westport',
    address: '300 E 39th St, Kansas City, MO',
    tags: [
      { label: 'Workshop', variant: 'workshop' },
      { label: 'Hybrid', variant: 'online' },
      { label: 'Hardware provided', variant: 'ghost' },
    ],
    lead: "Ever wanted off-grid text messaging that works when the cell network doesn't? Come build a LoRa mesh node from scratch, join the KC network, and watch your node light up on our live map — no experience required.",
    agenda: [
      { time: '6:30', title: 'Doors + pizza', detail: 'Grab a slice, find a seat, say hi.' },
      { time: '6:50', title: 'What is a mesh, anyway?', detail: 'A 10-minute, no-jargon intro to LoRa and Meshtastic.' },
      { time: '7:10', title: 'Flash your node', detail: 'Hands-on: firmware, channel config, and naming your node.' },
      { time: '7:50', title: 'Join the map + Q&A', detail: "Watch everyone's nodes appear live, then open floor." },
    ],
    bring: [
      'A laptop (Chrome or Edge)',
      'A USB-C data cable',
      'Curiosity (required)',
      'Soldering skills (not required!)',
    ],
    going: 23,
    host: {
      name: 'Evan Harmon',
      role: 'Co-Organizer · Mesh project lead',
      initials: 'EH',
    },
    free: true,
  },
  {
    slug: 'homelab-hack-night',
    title: 'Homelab Hack Night',
    day: '02',
    month: 'Jul',
    dateLabel: 'Wednesday, July 2',
    timeLabel: '7:00 – 9:00 PM CDT',
    venue: 'Online · Discord',
    address: 'Join from anywhere — link posted in Discord',
    tags: [
      { label: 'Hack Night', variant: 'hacknight' },
      { label: 'Online', variant: 'online' },
    ],
    lead: "Bring whatever you're tinkering with — a fresh Proxmox box, a Raspberry Pi cluster, a self-hosted app that won't behave — and hack alongside the group. Cameras optional, screen-shares encouraged. It's part co-working, part rubber-duck, all friendly.",
    agenda: [
      { time: '7:00', title: 'Kickoff + what are you building?', detail: 'Quick round of intros and tonight’s goals.' },
      { time: '7:15', title: 'Open hacking', detail: 'Break into voice rooms, share screens, swap tips.' },
      { time: '8:30', title: 'Show & tell', detail: 'Demo what you got working (or what broke).' },
    ],
    bring: [
      'Your homelab project',
      'A Discord account',
      'A second monitor (handy, not required)',
      'Questions for the group',
    ],
    going: 14,
    host: {
      name: 'Evan Harmon',
      role: 'Co-Organizer',
      initials: 'EH',
    },
    free: true,
  },
  {
    slug: 'tech-talk-night',
    title: 'Tech Talk Night + Open Q&A',
    day: '19',
    month: 'Jun',
    dateLabel: 'Thursday, June 19',
    timeLabel: '6:00 – 8:00 PM CDT',
    venue: 'Plexpod Westport Commons',
    address: '300 E 39th St, Kansas City, MO',
    tags: [
      { label: 'Talk', variant: 'talk' },
      { label: 'In Person', variant: 'online' },
    ],
    lead: 'A relaxed evening of short, punchy talks from folks in the KC tech community, followed by an open Q&A where any question is fair game. Whether you want to present or just listen, all skill levels and interests are welcome.',
    agenda: [
      { time: '6:00', title: 'Doors + mingle', detail: 'Snacks, name tags, and finding your people.' },
      { time: '6:30', title: 'Lightning talks', detail: 'Three to four 10-minute talks from the community.' },
      { time: '7:20', title: 'Open Q&A panel', detail: 'Ask the speakers (and the room) anything.' },
      { time: '7:50', title: 'Wrap + after-hangout', detail: 'Keep the conversation going nearby.' },
    ],
    bring: [
      'An open mind',
      'A talk idea (optional)',
      'Business cards or your handle',
      'Questions for the panel',
    ],
    going: 31,
    host: {
      name: 'Evan Harmon',
      role: 'Co-Organizer',
      initials: 'EH',
    },
    free: true,
  },
];
