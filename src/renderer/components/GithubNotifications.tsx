import GithubNotification from './GithubNotification';

import { Notification, NotificationGroup } from '../types';

interface GithubNotificationsProps {
  notifications: NotificationGroup;
}

const GithubNotifications = ({ notifications }: GithubNotificationsProps) => {
  return (
    <div className="github-notifications">
      {Object.keys(notifications).length <= 0 && <h3>No new notifications.</h3>}
      {Object.keys(notifications).length > 0 &&
        Object.keys(notifications).map((repoName) => {
          const repoNotifications = notifications[repoName];

          return (
            <>
              <h3>{repoName}</h3>
              {repoNotifications.map((notification: Notification) => {
                const {
                  id,
                  subject: { title, type },
                  updated_at: updatedAt,
                } = notification;

                return (
                  <GithubNotification
                    key={`notification_${id}`}
                    updatedAt={updatedAt}
                    title={title}
                    type={type}
                  />
                );
              })}
            </>
          );
        })}
    </div>
  );
};

export default GithubNotifications;
