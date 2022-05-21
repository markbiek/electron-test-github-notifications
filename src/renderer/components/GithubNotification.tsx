import dayjs from 'dayjs';

interface NotificationProps {
  title: string;
  updatedAt: string;
  type: string;
}

const GithubNotification = ({ title, updatedAt, type }: NotificationProps) => {
  const date = dayjs(updatedAt);

  return (
    <div className="github-notification">
      <table>
        <tbody>
          <tr>
            <td>{title}</td>
            <td>
              {date.format('YYYY-MM-DD HH:mm')}
              <span className="utc">{date.format('ZZ')}</span>
            </td>
            <td>{type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GithubNotification;
