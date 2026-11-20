// All editable copy for the site lives here.
// Anything in [BRACKETS] is a placeholder from the design. Fill it in before you launch.

export const site = {
  name: 'Jordan Hancock',
  handle: 'jordan.hancock',
  email: 'jordanzhancock@gmail.com',
  resumeUrl: '', // set to '/resume.pdf' after you drop the file into /public; empty hides the button
  github: 'https://github.com/jordanzhancock',
  linkedin: 'https://www.linkedin.com/in/jordan-hancock01/',
  portrait: '', // e.g. '/portrait.jpg' (4:5) in /public; empty shows the placeholder
};

export const stack = [
  'ASP.NET Core', 'C#', 'Entity Framework Core', 'React', 'Angular', 'TypeScript',
  'SQL Server', 'Docker', 'SignalR', 'Elasticsearch', 'Playwright', 'ESP32',
];

export type Category = 'software' | 'hardware';
export type Status = 'shipped' | 'building';

export interface Project {
  num: string;
  title: string;
  cat: Category;
  status: Status;
  /** Placeholder text shown until you add `image` or `video`. */
  media: string;
  image?: string;
  video?: string;
  blurb: string;
  tags: string[];
  href?: string;
  /** true keeps it off the site without deleting it. */
  hidden?: boolean;
}

// The home page shows every project without `hidden: true`, in this order.
export const projects: Project[] = [
  {
    num: '02', title: 'Hoverboard rover', cat: 'hardware', status: 'building',
    media: 'PHOTO · teardown on the bench',
    blurb: 'A four-wheel campus rover built from upcycled hoverboard hub motors, powered by healthy cells harvested from a dead battery pack.',
    tags: ['Hub motors', 'Li-ion', 'Aluminum chassis'],
  },
  {
    num: '03', title: 'Sunrise alarm clock', cat: 'hardware', status: 'building',
    media: 'VIDEO · RGB glow-up timelapse',
    blurb: 'An ESP32 clock with an RGB backlight glowing through a 3D-printed shell, a quad alphanumeric display, and soft tones instead of a buzzer.',
    tags: ['ESP32', 'MOSFET drivers', '3D printing'],
  },
  {
    num: '04', title: 'O(yes)', cat: 'software', status: 'shipped',
    media: 'SCREENSHOT · daily queue + progress heatmap',
    blurb: 'A study app for software engineers that schedules LeetCode-style DSA problems with spaced repetition, so each pattern comes back right before you would forget it. Daily queues, streaks, progress tracking, leaderboards and mock interviews.',
    tags: ['React', 'TypeScript', 'Supabase', 'Spaced repetition'],
    href: 'https://oyes.dev/',
  },
  {
    num: '05', title: 'Proxima', cat: 'software', status: 'building',
    media: 'SCREENSHOTS · 3 phone screens',
    blurb: 'A mobile companion that plans dates for you: AI-picked ideas, nearby restaurants, and reminders sorted cheap, active or thoughtful. Voice commands are next.',
    tags: ['Flutter', 'Supabase', 'Gemini', 'iOS + Android'],
  },
  {
    num: '06', title: 'Timecard autopilot', cat: 'software', status: 'shipped', hidden: true,
    media: 'SCREENSHOT · drafted email + sheet',
    blurb: 'A Google Apps Script that drafts my weekly timecard email with the .xlsx attached. It runs on Google’s servers and never sends without a human review.',
    tags: ['Apps Script', 'Gmail', 'Sheets'],
  },
  {
    num: '07', title: 'IFIDU', cat: 'software', status: 'building', hidden: true,
    media: 'SCREENSHOT · first build',
    blurb: '[ONE-LINE DESCRIPTION OF IFIDU]',
    tags: ['[STACK]'],
  },
];

export const experience = [
  { org: 'University of Central Florida', role: 'M.S. Robotics (incoming)', when: 'Starts Spring 2027' },
  { org: 'Seaboard Marine', role: 'Full Stack .NET Developer (contract)', when: 'Apr 2026 – Oct 2026' },
  { org: 'Allstate', role: 'Full Stack Developer, sole dev on Agentz', when: 'Apr 2025 – Apr 2026' },
  { org: 'Florida International University', role: 'B.S. Computer Science', when: '2025' },
];

export const agentz = {
  timeline: 'Apr 2025 – Apr 2026',
  problem:
    'Agentz was first built by a developer before me. The agents relied on it every day, but it lagged, carried a long list of bugs, and gave almost no visibility into what was going wrong. They wanted a faster, more refined experience. I stepped in and rebuilt it: I redesigned the data relationships in a new database while keeping all of the existing data, redesigned the UI, and strengthened core features like user authentication and role management.',
  bugs: [
    { id: '01', title: 'Duplicate lead detection and prevention', body: 'I built a service layer behind the lead webhooks that matched each incoming lead against existing households. New leads attached to existing records without overwriting data, and a new household was created only when no match existed.' },
    { id: '02', title: '20-second search queries', body: 'Name, household and phone lookups took up to 20 seconds because of inefficient database indexing and queries. I deployed Elasticsearch on a dedicated machine with a one-second sync to the API and SQL Server, so added and removed leads appeared in search almost immediately.' },
    { id: '03', title: 'Zero-loss V1 to V2 migration', body: 'I redesigned the data model into a normalized relational schema and migrated 295K+ records from V1 with no data loss.' },
    { id: '04', title: 'Inaccurate monthly premium reports', body: 'Monthly premium reports returned incomplete data and had to be verified by hand. I traced the problem to the data retrieval logic and corrected it, so the reports came out accurate.' },
  ],
};
