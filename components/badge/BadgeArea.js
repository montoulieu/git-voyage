import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import badgesJSON from '../../json/badges.json';
import BadgeCard from './BadgeCard';
import useGithubStore from '../../hooks/useGithubStore';
import useBadgeStore from '../../hooks/useBadgeStore';

function BadgeArea() {
  const [session, loading] = useSession();
  const badges = useBadgeStore((state) => state.badges);
  const addToBadges = useBadgeStore((state) => state.addToBadges);
  const loaded = useGithubStore((state) => state.loaded);
  const totalStars = useGithubStore((state) => state.totalStars);
  const totalCommits = useGithubStore((state) => state.totalCommits);

  const checkBadgesEarned = () => {
    // eslint-disable-next-line prefer-const
    let sortedBadges = badgesJSON;
    sortedBadges.sort((a, b) => b.requirement.value - a.requirement.value);

    sortedBadges.forEach((badge) => {
      let shouldAdd;

      if (badge.requirement.type === 'session') {
        const sessionRequirementValue = badge.requirement.path.split('.').reduce((o, i) => o[i], session);

        if (sessionRequirementValue >= badge.requirement.value) {
          shouldAdd = true;
        }
      }

      if (badge.requirement.type === 'commit') {
        if (totalCommits >= badge.requirement.value) {
          shouldAdd = true;
        }
      }

      if (badge.requirement.type === 'star') {
        console.log(totalStars);
        if (totalStars >= badge.requirement.value) {
          shouldAdd = true;
        }
      }

      if (shouldAdd) {
        addToBadges({
          id: badge.id,
          label: badge.label,
          emoji: badge.emoji,
          requirementValue: badge.requirement.value,
        });
      }
    });
  };

  const filteredBadges = badges.sort((a, b) => a.requirementValue < b.requirementValue);

  useEffect(() => {
    if (badges.length === 0 && loaded) {
      checkBadgesEarned();
    }
  }, [loaded]);

  return (
    <div
      className="mx-auto w-full lg:w-1/2 font-bold overflow-hidden pt-5 lg:pt-0"
    >
      <h5 className="text-3xl font-bolder text-blue-400 mb-4">
        Badges
      </h5>
      <div className="badge-container h-full p-5 pl-0 border-t-4 border-r-4 rounded-tr-3xl border-blue-400">
        {(badges.length > 0 && loaded)
          ? (
            <div className="badges grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 grid-row-2 gap-3">
              {badges.map((badge) => (
                <BadgeCard
                  key={badge.id}
                  emoji={badge.emoji}
                  label={badge.label}
                />
              ))}
            </div>
          )
          : (
            <span className="text-2xl text-blue-200">
              {loaded ? 'No badges earned yet.' : 'Loading...'}
            </span>
          )}
      </div>
    </div>
  );
}

export default BadgeArea;
