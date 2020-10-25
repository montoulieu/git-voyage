import '../styles/globals.css';
import { motion } from 'framer-motion';

import { Provider } from 'next-auth/client';

export default function App({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
    >
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>

    </motion.div>
  );
}
