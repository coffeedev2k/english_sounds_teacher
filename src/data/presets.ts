import { TrainingGroup, PresetMode } from '../types';

export const QUIZ_GROUPS: TrainingGroup[] = [
  {
    id: 'q1',
    name: 'Group 1: Zoo, Tea, Red',
    description: 'Initial warm-up with distinct plosive, fricative, and approximant.',
    soundIds: ['zoo', 'tea', 'red']
  },
  {
    id: 'q2',
    name: 'Group 2: Show, Bed, Boy',
    description: 'Diphthongs and short vowel practice.',
    soundIds: ['show', 'bed', 'boy']
  },
  {
    id: 'q3',
    name: 'Group 3: Here, Cure, Hair',
    description: 'Centering diphthongs (/ɪə/, /ʊə/, /eə/).',
    soundIds: ['here', 'cure', 'hair']
  },
  {
    id: 'q4',
    name: 'Group 4: Good, Shoot, Cure',
    description: 'Short /ʊ/, long /uː/, and diphthong /ʊə/.',
    soundIds: ['good', 'shoot', 'cure']
  },
  {
    id: 'q5',
    name: 'Group 5: Pea, Boat, Car, Tea, Dog',
    description: 'Plosive pairs: /p/, /b/, /k/, /t/, /d/.',
    soundIds: ['pea', 'boat', 'car', 'tea', 'dog']
  },
  {
    id: 'q6',
    name: 'Group 6: See, Television, Zoo, Shall, Hat, Man',
    description: 'Fricatives /s/, /z/, /ʃ/, /ʒ/, glottal /h/, and nasal /m/.',
    soundIds: ['see', 'television', 'zoo', 'shall', 'hat', 'man']
  },
  {
    id: 'q7',
    name: 'Group 7: Now, Singer, Love, Red, Wet, Yes',
    description: 'Nasals and approximants (/n/, /ŋ/, /l/, /r/, /w/, /j/).',
    soundIds: ['now', 'singer', 'love', 'red', 'wet', 'yes']
  },
  {
    id: 'q8',
    name: 'Group 8: Bed, Teacher, Bird, Door, Cure, Boy, Show',
    description: 'Vowels and diphthongs review.',
    soundIds: ['bed', 'teacher', 'bird', 'door', 'cure', 'boy', 'show']
  },
  {
    id: 'q9',
    name: 'Group 9: Here, Wait, Cure, Boy, Show, Hair, My, Cow',
    description: 'Full 8 Diphthongs challenge!',
    soundIds: ['here', 'wait', 'cure', 'boy', 'show', 'hair', 'my', 'cow']
  },
  {
    id: 'q10',
    name: 'Group 10: Sheep, Ship, Good, Shoot, Here, Wait',
    description: 'High front & back vowel distinctions.',
    soundIds: ['sheep', 'ship', 'good', 'shoot', 'here', 'wait']
  },
  {
    id: 'q11',
    name: 'Group 11: Cat, Up, Far, On, Hair, My, Cow',
    description: 'Low and back vowels plus diphthongs.',
    soundIds: ['cat', 'up', 'far', 'on', 'hair', 'my', 'cow']
  },
  {
    id: 'q12',
    name: 'Group 12: Cheese, June, Fly, Video, This, Think',
    description: 'Advanced dental fricatives and affricates.',
    soundIds: ['cheese', 'june', 'fly', 'video', 'this', 'think']
  }
];

export const TRAINING_GROUPS: TrainingGroup[] = [
  {
    id: 't1',
    name: 'Group 1: Dental & Affricate Pairs',
    description: 'Intensive start: /tʃ/, /dʒ/, /f/, /v/, /ð/, /θ/',
    soundIds: ['cheese', 'june', 'fly', 'video', 'this', 'think']
  },
  {
    id: 't2',
    name: 'Group 2: Show, Bed, Boy',
    soundIds: ['show', 'bed', 'boy']
  },
  {
    id: 't3',
    name: 'Group 3: Good, Shoot, Cure',
    soundIds: ['good', 'shoot', 'cure']
  },
  {
    id: 't4',
    name: 'Group 4: Pea, Boat, Car, Tea, Dog',
    soundIds: ['pea', 'boat', 'car', 'tea', 'dog']
  },
  {
    id: 't5',
    name: 'Group 5: Cat, Up, Far, On, Hair, My, Cow',
    soundIds: ['cat', 'up', 'far', 'on', 'hair', 'my', 'cow']
  },
  {
    id: 't6',
    name: 'Group 6: See, Television, Zoo, Shall, Hat, Man',
    soundIds: ['see', 'television', 'zoo', 'shall', 'hat', 'man']
  },
  {
    id: 't7',
    name: 'Group 7: Now, Singer, Love, Red, Wet, Yes',
    soundIds: ['now', 'singer', 'love', 'red', 'wet', 'yes']
  },
  {
    id: 't8',
    name: 'Group 8: Here, Cure, Hair',
    soundIds: ['here', 'cure', 'hair']
  },
  {
    id: 't9',
    name: 'Group 9: Here, Wait, Cure, Boy, Show, Hair, My, Cow',
    soundIds: ['here', 'wait', 'cure', 'boy', 'show', 'hair', 'my', 'cow']
  },
  {
    id: 't10',
    name: 'Group 10: Sheep, Ship, Good, Shoot, Here, Wait',
    soundIds: ['sheep', 'ship', 'good', 'shoot', 'here', 'wait']
  },
  {
    id: 't11',
    name: 'Group 11: Bed, Teacher, Bird, Door, Cure, Boy, Show',
    soundIds: ['bed', 'teacher', 'bird', 'door', 'cure', 'boy', 'show']
  },
  {
    id: 't12',
    name: 'Group 12: Cheese, June, Fly, Video, This, Think',
    soundIds: ['cheese', 'june', 'fly', 'video', 'this', 'think']
  }
];

export const MINIMAL_PAIRS_GROUPS: TrainingGroup[] = [
  {
    id: 'mp1',
    name: 'Minimal Pair: /iː/ vs /ɪ/ (sheep vs ship)',
    description: 'Crucial contrast between long close front and short lax front vowels.',
    soundIds: ['sheep', 'ship']
  },
  {
    id: 'mp2',
    name: 'Minimal Pair: /ʊ/ vs /uː/ (good vs shoot)',
    description: 'Short rounded vowel /ʊ/ vs long back /uː/.',
    soundIds: ['good', 'shoot']
  },
  {
    id: 'mp3',
    name: 'Minimal Pair: /e/ vs /æ/ vs /ʌ/ (bed vs cat vs up)',
    description: 'Front open-mid /e/, front near-open /æ/, and back open-mid /ʌ/.',
    soundIds: ['bed', 'cat', 'up']
  },
  {
    id: 'mp4',
    name: 'Minimal Pair: /θ/ vs /ð/ (think vs this)',
    description: 'Voiceless vs voiced dental fricatives.',
    soundIds: ['think', 'this']
  },
  {
    id: 'mp5',
    name: 'Minimal Pair: /s/ vs /z/ vs /ʃ/ vs /ʒ/',
    description: 'Sibilants: see, zoo, shall, television.',
    soundIds: ['see', 'zoo', 'shall', 'television']
  },
  {
    id: 'mp6',
    name: 'Minimal Pair: /tʃ/ vs /dʒ/ (cheese vs june)',
    description: 'Affricates: voiceless vs voiced.',
    soundIds: ['cheese', 'june']
  },
  {
    id: 'mp7',
    name: 'Minimal Pair: /w/ vs /v/ (wet vs video)',
    description: 'Common ESL confusion: approximant /w/ vs fricative /v/.',
    soundIds: ['wet', 'video']
  },
  {
    id: 'mp8',
    name: 'Minimal Pair: /n/ vs /ŋ/ (now vs singer)',
    description: 'Alveolar nasal /n/ vs velar nasal /ŋ/.',
    soundIds: ['now', 'singer']
  }
];

export const FULL_CHART_GROUPS: TrainingGroup[] = [
  {
    id: 'fc1',
    name: 'All 12 Monophthongs (Pure Vowels)',
    soundIds: ['sheep', 'ship', 'good', 'shoot', 'bed', 'teacher', 'bird', 'door', 'cat', 'up', 'far', 'on']
  },
  {
    id: 'fc2',
    name: 'All 8 Diphthongs (Gliding Vowels)',
    soundIds: ['here', 'wait', 'cure', 'boy', 'show', 'hair', 'my', 'cow']
  },
  {
    id: 'fc3',
    name: 'All 24 Consonants',
    soundIds: [
      'pea', 'boat', 'tea', 'dog', 'cheese', 'june', 'car', 'go',
      'fly', 'video', 'think', 'this', 'see', 'zoo', 'shall', 'television',
      'man', 'now', 'singer', 'hat', 'love', 'red', 'wet', 'yes'
    ]
  }
];

export function getPresetGroups(mode: PresetMode, customSoundIds?: string[]): TrainingGroup[] {
  switch (mode) {
    case 'quiz':
      return QUIZ_GROUPS;
    case 'training':
      return TRAINING_GROUPS;
    case 'minimal_pairs':
      return MINIMAL_PAIRS_GROUPS;
    case 'full':
      return FULL_CHART_GROUPS;
    case 'custom':
      if (customSoundIds && customSoundIds.length > 0) {
        return [
          {
            id: 'custom_group',
            name: `Custom Practice (${customSoundIds.length} sounds)`,
            soundIds: customSoundIds
          }
        ];
      }
      return QUIZ_GROUPS;
  }
}
