import { useRouter } from 'next/router';
import { providers, signIn } from 'next-auth/client';
import {
  LogoGithubIcon,
} from '@primer/octicons-react';

export default function SignIn({ providers }) {
  const router = useRouter();

  return (
    <div className="bg-galaxy min-h-screen flex items-center justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: router.query.callbackUrl })}
            type="button"
            className="bg-purple-600 p-3 mx-auto w-64 flex items-center text-xl justify-center"
          >
            Sign in with
            {' '}
            <LogoGithubIcon
              className="ml-4 transform scale-150"
            />
            {/* {provider.name} */}
          </button>
        </div>
      ))}
    </div>
  );
}

SignIn.getInitialProps = async (context) => ({
  providers: await providers(context),
});
