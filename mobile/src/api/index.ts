const API_URL = 'http://localhost:3000/api/v1';

export const api = {
  // Queue endpoints
  queue: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/queue`);
      return response.json();
    },
    
    create: async (data: {
      clientName: string;
      phoneNumber: string;
      estimatedTime?: number;
      priority?: boolean;
    }) => {
      const response = await fetch(`${API_URL}/queue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    
    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/queue/${id}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    
    next: async () => {
      const response = await fetch(`${API_URL}/queue/next`, {
        method: 'POST',
      });
      return response.json();
    },
  },
};

export default api;
