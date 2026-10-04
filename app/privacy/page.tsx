import type { Metadata } from 'next';
import InfoPage from '../info-page';

export const metadata: Metadata = {
  title: 'Privacy Policy · Cows In Love',
  description:
    'Cows In Love does not collect, store or share any personal information.',
};

export default function Privacy() {
  return (
    <InfoPage title="Privacy Policy">
      <p className="info-meta">Last updated: 3 October 2026</p>
      <p>Cows In Love does not collect, store or share any personal information.</p>
      <ul>
        <li>The game has no accounts, no sign-in and no online features.</li>
        <li>It contains no advertising and no analytics or tracking code.</li>
        <li>It does not use the camera, microphone, location, contacts or photos.</li>
        <li>Everything the game needs runs on your device, and nothing is sent anywhere.</li>
      </ul>
      <p>
        This website uses Google Analytics to count visits. The game itself still
        collects nothing.
      </p>
      <p>
        The store you downloaded it from (the App Store, Google Play, Steam or the
        Microsoft Store) may collect data under its own privacy policy; that is
        between you and the store.
      </p>
      <p>
        Questions: open an issue at{' '}
        <a href="https://github.com/jamierpond/cowsinlove.com/issues">
          github.com/jamierpond/cowsinlove.com/issues
        </a>
      </p>
    </InfoPage>
  );
}
