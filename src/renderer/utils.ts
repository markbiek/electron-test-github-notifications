import { Notification, NotificationGroup } from './types';

const groupNotifications = (
  notifications: Notification[] | null
): NotificationGroup => {
  const groupedNotifications: NotificationGroup = {};

  if (notifications) {
    notifications.map((n) => {
      const {
        repository: { full_name: fullName },
      } = n;

      if (
        !Object.prototype.hasOwnProperty.call(groupedNotifications, fullName)
      ) {
        groupedNotifications[fullName] = [];
      }

      groupedNotifications[fullName].push(n);

      return null;
    });
  }

  return groupedNotifications;
};

export default groupNotifications;
