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
  const totalCommits = useGithubStore((state) => state.totalCommits);

  const checkBadgesEarned = () => {
    badgesJSON.forEach((badge) => {
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
    if (badges.length === 0) {
      checkBadgesEarned();
    }
  }, []);

  return (
    <div
      className="mx-auto w-full lg:w-1/2 font-bold"
    >
      <h5 className="text-3xl font-bolder text-orange-400 mb-3 border-b-2 border-orange-400 pb-3">
        Badges
      </h5>
      {filteredBadges.length > 0
        ? (
          <div className="badges grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 grid-row-2 gap-3">
            {filteredBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                emoji={badge.emoji}
                label={badge.label}
              />
            ))}
          </div>
        )
        : (
          <span className="text-2xl">
            No badges earned yet.
          </span>
        )}
    </div>
  );
}

export default BadgeArea;
