const GITHUB_USER = 'Ntiendat-2k3';
const BASE = 'https://api.github.com';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// GitHub PAT — 5000 req/hr (vs 60 unauthenticated)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

// ===== Types =====
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    ref?: string;
    ref_type?: string;
    action?: string;
    pull_request?: { title: string };
  };
}

export interface LanguageBreakdown {
  [lang: string]: number;
}

export interface FileTreeItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url: string | null;
  size: number;
}

// ===== Auth Headers =====

function getHeaders(extra?: Record<string, string>): HeadersInit {
  const headers: Record<string, string> = {
    ...extra,
  };
  if (GITHUB_TOKEN && GITHUB_TOKEN !== 'your_github_pat_here') {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }
  return headers;
}

// Debug: verify token loaded
if (import.meta.env.DEV) {
  console.log(
    `[GitHub API] Token: ${GITHUB_TOKEN ? '✅ loaded (' + GITHUB_TOKEN.slice(0, 15) + '...)' : '❌ missing'}`
  );
}

// ===== Cache Layer =====

function getCached<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(`gh_${key}`);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(`gh_${key}`);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(`gh_${key}`, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // sessionStorage full — ignore
  }
}

async function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = getCached<T>(key);
  if (cached !== null) return cached;
  const data = await fetcher();
  // Only cache non-empty successful responses
  const isEmpty =
    data === null ||
    data === undefined ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'object' && data !== null && Object.keys(data).length === 0);
  if (!isEmpty) {
    setCache(key, data);
  }
  return data;
}

// ===== API Functions =====

export async function fetchRepos(perPage = 6): Promise<GitHubRepo[]> {
  return cachedFetch(`repos_${perPage}`, async () => {
    const res = await fetch(
      `${BASE}/users/${GITHUB_USER}/repos?sort=updated&per_page=${perPage}`,
      { headers: getHeaders() }
    );
    if (!res.ok) {
      if (res.status === 403) {
        console.warn('GitHub API rate limit reached.');
        return [];
      }
      throw new Error('Failed to fetch repos');
    }
    return res.json();
  });
}

export async function fetchEvents(perPage = 10): Promise<GitHubEvent[]> {
  return cachedFetch(`events_${perPage}`, async () => {
    const res = await fetch(
      `${BASE}/users/${GITHUB_USER}/events?per_page=${perPage}`,
      { headers: getHeaders() }
    );
    if (!res.ok) return [];
    return res.json();
  });
}

export async function fetchLanguages(repoName: string): Promise<LanguageBreakdown> {
  return cachedFetch(`lang_${repoName}`, async () => {
    const res = await fetch(
      `${BASE}/repos/${GITHUB_USER}/${repoName}/languages`,
      { headers: getHeaders() }
    );
    if (!res.ok) return {};
    return res.json();
  });
}

export async function fetchReadme(repoName: string): Promise<string | null> {
  return cachedFetch(`readme_${repoName}`, async () => {
    try {
      const res = await fetch(
        `${BASE}/repos/${GITHUB_USER}/${repoName}/readme`,
        { headers: getHeaders({ Accept: 'application/vnd.github.v3.raw' }) }
      );
      if (!res.ok) return null;
      return res.text();
    } catch {
      return null;
    }
  });
}

export async function fetchFileTree(
  repoName: string,
  path = ''
): Promise<FileTreeItem[]> {
  return cachedFetch(`tree_${repoName}_${path}`, async () => {
    const res = await fetch(
      `${BASE}/repos/${GITHUB_USER}/${repoName}/contents/${path}`,
      { headers: getHeaders() }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  });
}

export async function fetchFileContent(downloadUrl: string): Promise<string> {
  const res = await fetch(downloadUrl, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch file content');
  return res.text();
}

// ===== Helpers =====

export function formatEventMessage(event: GitHubEvent): string {
  const repoName = event.repo.name.split('/')[1];
  const time = getTimeAgo(event.created_at);

  switch (event.type) {
    case 'PushEvent': {
      const msg = event.payload.commits?.[0]?.message || 'update';
      return `📦 Push vào **${repoName}**: "${msg}" — ${time}`;
    }
    case 'CreateEvent':
      return `🆕 Tạo ${event.payload.ref_type} **${event.payload.ref || repoName}** — ${time}`;
    case 'PullRequestEvent':
      return `🔀 PR "${event.payload.pull_request?.title}" trong **${repoName}** — ${time}`;
    case 'WatchEvent':
      return `⭐ Star dự án **${repoName}** — ${time}`;
    case 'ForkEvent':
      return `🍴 Fork dự án **${repoName}** — ${time}`;
    case 'IssuesEvent':
      return `🐛 ${event.payload.action} issue trong **${repoName}** — ${time}`;
    default:
      return `🔧 Hoạt động trong **${repoName}** — ${time}`;
  }
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  return `${Math.floor(days / 30)} tháng trước`;
}

// Language color map
export const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Go: '#00ADD8',
  Rust: '#dea584',
  Vue: '#41b883',
  PHP: '#4F5D95',
  PLpgSQL: '#336790',
  Batchfile: '#C1F12E',
};
