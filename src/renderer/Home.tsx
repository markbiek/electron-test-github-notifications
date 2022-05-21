import { useEffect, useState } from 'react';

import useLocalStorage from './hooks/use-localstorage';
import groupNotifications from './utils';

import AuthForm from './components/AuthForm';
import GithubNotifications from './components/GithubNotifications';
import './App.css';

import { Notification } from './types';

const Home = () => {
  const currentUsername = useLocalStorage('github-username');
  const currentToken = useLocalStorage('github-token');
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const credentials = btoa(`${currentUsername}:${currentToken}`);

  useEffect(() => {
    if (currentUsername && currentToken) {
      setLoggedIn(true);
    }
  }, [currentUsername, currentToken]);

  // Fetch Github user data
  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    const fetchGithubUserData = async () => {
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
      const json = await res.json();

      setUserData(json);
    };

    fetchGithubUserData();
  }, [loggedIn, credentials]);

  // Poll for notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch(
        `https://api.github.com/notifications?participating=true&all=${
          showAll ? 'true' : 'false'
        }`,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      if (res.status === 304) {
        return;
      }

      const json = await res.json();
      setNotifications(json);
    };

    fetchNotifications();

    const interval = setInterval(() => {
      if (!loggedIn) {
        return;
      }

      fetchNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, [loggedIn, credentials, showAll]);

  const handleConnect = (username: string, token: string) => {
    if (!username || !token) {
      // TODO - error
      alert('nooooo!');
      return;
    }

    localStorage.setItem('github-username', username);
    localStorage.setItem('github-token', token);
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return <AuthForm connect={handleConnect} />;
  }

  if (!userData) {
    return <p className="error">No user data to display</p>;
  }

  const { login } = userData;
  const groupedNotifications = groupNotifications(notifications);

  return (
    <>
      <div className="github-user">
        <h1>Github Notifications</h1>
        <h3>
          Connected as <span className="github-username">{login}</span>
        </h3>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            setLoggedIn(false);
            localStorage.removeItem('github-username');
            localStorage.removeItem('github-token');
          }}
        >
          logout
        </button>
      </div>
      <div className="options">
        <label htmlFor="options-show-all">
          <input
            type="checkbox"
            name="options-show-all"
            id="options-show-all"
            checked={showAll}
            onChange={(e) => {
              setShowAll(!showAll);
            }}
          />
          Show all notifications
        </label>
      </div>
      <GithubNotifications notifications={groupedNotifications} />
    </>
  );
};

export default Home;
