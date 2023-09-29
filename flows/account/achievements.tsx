import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { appContext } from '../../App';
import firebase from '../firebase';
import Achievement from './achievement';

type AchievementType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  qualifyingQuestCompletions: number;
  qualifyingQuestIds: string[];
};

function Achievements() {
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const userContext = useContext(appContext);

  useEffect(() => {
    fetchAndSetAchievements();
    fetchUserCompletedQuests();
  }, []);

  // update this to fetch only completed achievements from user document
  const fetchAndSetAchievements = async () => {
    // need to update this to fetch only the user achievements
    const userAchievements = await fetchAllAchievements();
    setAchievements(userAchievements);
  };

  const fetchUserCompletedQuests = async (): Promise<string[]> => {
    let userCompetedQuests: string[] = [];

    const q = query(
      collection(firebase.firestore, 'user'),
      where('UID', '==', userContext.userID),
    );

    const completedQuestsSnapshot = await getDocs(q);
    completedQuestsSnapshot.forEach(doc => {
      let user = doc.data();
      userCompetedQuests = user.completedQuests;
    });

    console.log('user completed quests: ', userCompetedQuests);
    return userCompetedQuests;
  };

  const fetchAllAchievements = async (): Promise<AchievementType[]> => {
    const achievementsSnapshot = await getDocs(
      collection(firebase.firestore, 'achievements'),
    );
    const achievementList: AchievementType[] = [];

    achievementsSnapshot.forEach(doc => {
      const data = doc.data() as AchievementType;
      data.id = doc.id;
      achievementList.push(data);
    });

    return achievementList;
  };

  // Function to be called after successful quest completion. Will likely need to be relocated.
  // Checks if the user has completed any new achievements and returns updated achievement array.
  const checkAchievementCompletion = async (
    userCompletedQuests: string[],
    allAchievements: AchievementType[],
    userAchievements: string[],
    newQuestCompletionId: string,
  ): Promise<string[]> => {
    const allUserCompletedQuests = [
      ...userCompletedQuests,
      newQuestCompletionId,
    ];
    let qualifiedQuestCompletionCount = 0;

    allAchievements.forEach(achievement => {
      if (!userAchievements.includes(achievement.id)) {
        achievement.qualifyingQuestIds.forEach(qualifiedQuestId => {
          if (allUserCompletedQuests.includes(qualifiedQuestId)) {
            qualifiedQuestCompletionCount++;
          }
        });

        if (
          qualifiedQuestCompletionCount >=
          achievement.qualifyingQuestCompletions
        ) {
          userAchievements.push(achievement.id);
        }
      }
    });

    return userAchievements;
  };

  return (
    <View>
      {achievements.map(achievement => (
        <Achievement key={achievement.id} {...achievement} />
      ))}
    </View>
  );
}

export default Achievements;
