import { signIn, signOut, useSession } from 'next-auth/client';
import useGithubStore from '../hooks/useGithubStore';

function MainNav() {
  const [session, loading] = useSession();
  const repos = useGithubStore((state) => state.repos);

  const signOutOfApp = () => {
    signOut();
  };

  return (
    <header className="fixed w-full bg-gray-900 bg-opacity-90 border-b border-gray-800 text-gray-200 font-light p-3 z-10 shadow-xl">
      <div className="container flex items-center mx-auto">
        <div className="text-3xl sm:text-4xl font-black text-purple-400 text-shadow">
          Git Voyage
        </div>
        {session && (
          <>
            {/* <div className="mr-auto hidden sm:block">
              <button
                onClick={() => console.log(session)}
                className="btn-nav-item font-light"
                type="button"
              >
                Log Session
              </button>

              <button
                onClick={() => console.log(repos)}
                className="btn-nav-item font-light"
                type="button"
              >
                Log Repos
              </button>
            </div> */}

            <div className="flex ml-auto text-right">
              <div>
                {'Hello '}
                {session.user.name.split(' ')[0]}
                {'!'}
                <br />
                <button
                  onClick={signOutOfApp}
                  type="button"
                >
                  Sign out

                </button>
              </div>
              <div className="ml-3">
                <a
                  href={session.token.profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={session.user.image}
                    className="h-12 rounded-full border border-gray-700 shadow"
                    alt="GitHub Profile"
                  />
                </a>
              </div>
            </div>
          </>
        )}
        {!session
          && (
          <div className="ml-auto text-right">
            Not signed in
            {' '}
            <br />
            <button
              onClick={signIn}
              type="button"
            >
              Sign in

            </button>
          </div>
          )}
      </div>
    </header>
  );
}

export default MainNav;
