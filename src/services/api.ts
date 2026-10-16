import { Player, GalleryItem, NewsItem, MatchItem, RegistrationItem, AdminUser, AcademyType, AgeCategory } from '../types';

const RAW_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_BASE = RAW_URL ? `${RAW_URL}/api` : '/api';

export const getApiUrl = (endpoint: string = ''): string => {
  return `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export const getMediaUrl = (path?: string, fallback: string = ''): string => {
  if (!path) return fallback;
  if (path.startsWith('data:') || path.startsWith('blob:')) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads')) {
    const backendUrl = RAW_URL || 'http://localhost:5000';
    return `${backendUrl}${path}`;
  }
  return path;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('fackson_admin_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('fackson_admin_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('fackson_admin_token');
};

const getHeaders = (isFormData: boolean = false): HeadersInit => {
  const headers: HeadersInit = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // AUTH
  async login(username: string, password: string): Promise<{ token: string; admin: AdminUser }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async verifyAuth(): Promise<{ success: boolean; user?: any }> {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  // MEDIA UPLOADS
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Image upload failed');
    return data.url;
  },

  // PLAYERS
  async getPlayers(params?: { academy?: AcademyType; category?: AgeCategory }): Promise<Player[]> {
    const query = new URLSearchParams();
    if (params?.academy) query.append('academy', params.academy);
    if (params?.category) query.append('category', params.category);

    const res = await fetch(`${API_BASE}/players?${query.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  async createPlayer(playerData: Partial<Player>): Promise<Player> {
    const res = await fetch(`${API_BASE}/players`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(playerData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create player');
    return data.data;
  },

  async updatePlayer(id: string, playerData: Partial<Player>): Promise<Player> {
    const res = await fetch(`${API_BASE}/players/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(playerData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update player');
    return data.data;
  },

  async deletePlayer(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/players/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete player');
  },

  // GALLERY
  async getGallery(params?: { category?: string; academy?: string }): Promise<GalleryItem[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.academy) query.append('academy', params.academy);

    const res = await fetch(`${API_BASE}/gallery?${query.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  async createGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to post picture to gallery');
    return data.data;
  },

  async deleteGalleryItem(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete picture');
  },

  // NEWS
  async getNews(academy?: string): Promise<NewsItem[]> {
    const query = academy ? `?academy=${academy}` : '';
    const res = await fetch(`${API_BASE}/news${query}`);
    const data = await res.json();
    return data.data || [];
  },

  async createNews(newsData: Partial<NewsItem>): Promise<NewsItem> {
    const res = await fetch(`${API_BASE}/news`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(newsData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create news post');
    return data.data;
  },

  async deleteNews(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/news/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete article');
  },

  // MATCHES
  async getMatches(params?: { academy?: string; category?: string; status?: string }): Promise<MatchItem[]> {
    const query = new URLSearchParams();
    if (params?.academy) query.append('academy', params.academy);
    if (params?.category) query.append('category', params.category);
    if (params?.status) query.append('status', params.status);

    const res = await fetch(`${API_BASE}/matches?${query.toString()}`);
    const data = await res.json();
    return data.data || [];
  },

  async createMatch(matchData: Partial<MatchItem>): Promise<MatchItem> {
    const res = await fetch(`${API_BASE}/matches`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(matchData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create match fixture');
    return data.data;
  },

  async updateMatch(id: string, matchData: Partial<MatchItem>): Promise<MatchItem> {
    const res = await fetch(`${API_BASE}/matches/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(matchData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update match');
    return data.data;
  },

  async deleteMatch(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/matches/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete match');
  },

  // REGISTRATIONS
  async submitRegistration(regData: any): Promise<RegistrationItem> {
    const res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data.data;
  },

  async getRegistrations(): Promise<RegistrationItem[]> {
    const res = await fetch(`${API_BASE}/registrations`, {
      headers: getHeaders()
    });
    const data = await res.json();
    return data.data || [];
  },

  async updateRegistrationStatus(id: string, status: string): Promise<RegistrationItem> {
    const res = await fetch(`${API_BASE}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update status');
    return data.data;
  },

  // PAYMENTS (Flutterwave server verification & history)
  async verifyPayment(verificationData: { transaction_id: string | number; tx_ref: string; registrationId?: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verificationData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Payment verification failed');
    return data;
  },

  async getPaymentHistory(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/payment/history`, {
      headers: getHeaders()
    });
    const data = await res.json();
    return data.data || [];
  }
};

