export interface Notification {
  id: string;
  repository: {
    full_name: string;
  };
  subject: {
    title: string;
    type: string;
  };
  updated_at: string;
}

export interface NotificationGroup {
  [index: string]: Notification[];
}
