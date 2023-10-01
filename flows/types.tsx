import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GeoPoint } from 'firebase/firestore';

export type CreateQuestStackType = {
  Me: undefined;
  Create: undefined;
  'Quest Stats': undefined;
  Quest: undefined;
  'Validate Media': undefined;
  'Validate Quiz': undefined;
  'Validate Location': undefined;
  Rate: undefined;
  'Choose Location': undefined;
};

export type ConsumeQuestStackType = {
  SearchMap: undefined;
  Quest: undefined;
  'Validate Media': undefined;
  'Validate Quiz': undefined;
  'Validate Location': undefined;
  Rate: undefined;
};

export type AuthStackType = {
  signup: undefined;
  login: undefined;
};

export type SearchTabsType = {
  Search: undefined;
  Map: undefined;
};

export type MeTabsType = {
  Profile: undefined;
  Achievements: undefined;
  'Created Quests': undefined;
  'Joined Quests': undefined;
};

export type TabsType = {
  Community: undefined;
  Search: undefined;
  Profile: undefined;
};

export type questForm = {
  type: 'undecided' | 'media' | 'location' | 'quiz';
  tagline: string;
  description: string;
  tags: Array<string>;
  creator: string;
  difficulty_rating: [0, 0, 0, 0, 0];
  quality_rating: [0, 0, 0, 0, 0];
  quiz_question?: string;
  correct_answer?: string;
  quest_image_location: string;
  example_image_location: string;
  geohash?: string;
  incorrect_answers: Array<string>;
  pic_satisfying_condition?: string;
  lat?: number;
  lng?: number;
  location?: GeoPoint;
  published: Boolean;
  creator_number: number | undefined;
};

export type CreationFormType = NativeStackScreenProps<
  CreateQuestStackType,
  'Create'
>;
