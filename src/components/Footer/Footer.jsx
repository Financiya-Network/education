import styles from './Footer.module.css';
import clsx from 'clsx';
import Link from 'next/link';
import Logo from '@/icons/logo.svg';
import Notification from '@/components/Notification';
import { useState } from 'react';
import NewsLetterTextContent from '../NewsLetterTextContent';
import useSubscription from '@/hooks/useSubscription';

function Footer() {
  const [email, setEmail] = useState('');
  const [sendSubscription, sending, message, status, showNotification] = useSubscription({ email, setEmail });

  const handleInput = (e) => setEmail(e.target.value);

  const handleKeyPress = (e) => e.key === 'Enter' && email && sendSubscription();

  return (
    <footer className={styles.container}>
      <div className={styles.container_wrapper}>
        <div className={styles.footer_top}>
          <Link href="/">
            <a className={styles.logo}>
              <Logo />
            </a>
          </Link>
          <NewsLetterTextContent isHomePage={false} />
        </div>
        <div className={styles.footer_bottom}>
          <p className={clsx('text-md--short', styles.copyright)}>{new Date().getFullYear()} @Blockchain Education</p>
          <div className={styles.sub}>
            <input
              onChange={handleInput}
              onKeyUp={handleKeyPress}
              value={email}
              className={styles.sub_input}
              type="text"
              placeholder="Your Email Address"
            />
            <button
              onClick={sendSubscription}
              disabled={sending || !email}
              className={clsx(styles.sub_btn, 'body-short-03')}
            >
              {sending ? 'Sending...' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
      <Notification isActive={showNotification} message={message} type={status} />
    </footer>
  );
}

export default Footer;
