export interface Author {
  name: string;
  role: string;
  initials: string;
  variant?: 'blue' | 'pink' | 'ink';
  bio?: string;
}

export const authors: Record<string, Author> = {
  'evan-harmon': {
    name: 'Evan Harmon',
    role: 'Co-Organizer',
    initials: 'EH',
    variant: 'blue',
    bio: 'Co-organizer of KCTE and serial node-flasher. Runs the Meshtastic map project and will absolutely talk your ear off about LoRa propagation.',
  },
  'jesse-soto': {
    name: 'Jesse Soto',
    role: 'Organizer',
    initials: 'JS',
    variant: 'pink',
    bio: 'KCTE organizer who never misses a lightning talk. Happiest with a demo in one hand and a mic in the other.',
  },
  'cayden-rho': {
    name: 'Cayden Rho',
    role: 'Organizer',
    initials: 'CR',
    variant: 'ink',
    bio: 'KCTE organizer and homelab tinkerer. Keeps the community cluster humming and the open-data project honest.',
  },
  'ana-mireles': {
    name: 'Ana Mireles',
    role: 'Member',
    initials: 'AM',
    variant: 'blue',
    bio: 'KCTE member and first-timer-whisperer. Believes the best thing you can say at a meetup is "I\'m a beginner."',
  },
  'riya-tan': {
    name: 'Riya Tan',
    role: 'Member',
    initials: 'RT',
    variant: 'pink',
    bio: 'KCTE member and hack-night regular. Ships fast, breaks things, writes the recap before the coffee wears off.',
  },
};

export function getAuthor(key: string): Author {
  return (
    authors[key] ?? {
      name: key,
      role: 'Member',
      initials: key.slice(0, 2).toUpperCase(),
      variant: 'blue',
    }
  );
}
