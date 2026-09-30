import { SoundData } from '../types';

export const ALL_SOUNDS: SoundData[] = [
  // Monophthongs (12)
  {
    id: 'sheep',
    label: 'sheep',
    ipa: '/iː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['sheep', 'see', 'feet', 'team'],
    description: 'Long high front unrounded vowel. Lips spread, tongue high near roof of mouth.'
  },
  {
    id: 'ship',
    label: 'ship',
    ipa: '/ɪ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['ship', 'sit', 'in', 'fish'],
    description: 'Short lax front unrounded vowel. Slightly more open than /iː/.'
  },
  {
    id: 'good',
    label: 'good',
    ipa: '/ʊ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['good', 'put', 'book', 'look'],
    description: 'Short near-close back rounded vowel. Lips gently rounded.'
  },
  {
    id: 'shoot',
    label: 'shoot',
    ipa: '/uː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['shoot', 'blue', 'food', 'two'],
    description: 'Long close back rounded vowel. Lips pursed and rounded.'
  },
  {
    id: 'bed',
    label: 'bed',
    ipa: '/e/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['bed', 'men', 'red', 'said'],
    description: 'Short open-mid front unrounded vowel. Jaw slightly dropped, tongue mid-front.'
  },
  {
    id: 'teacher',
    label: 'teacher',
    ipa: '/ə/',
    category: 'monophthong',
    categoryLabel: 'Schwa / Neutral',
    exampleWords: ['teacher', 'about', 'banana', 'water'],
    description: 'Mid-central neutral vowel (Schwa). Completely relaxed mouth and tongue.'
  },
  {
    id: 'bird',
    label: 'bird',
    ipa: '/ɜː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['bird', 'word', 'turn', 'girl'],
    description: 'Long open-mid central unrounded vowel. Neutral lips, tongue flat in center.'
  },
  {
    id: 'door',
    label: 'door',
    ipa: '/ɔː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['door', 'four', 'saw', 'walk'],
    description: 'Long open-mid back rounded vowel. Jaw open, lips rounded.'
  },
  {
    id: 'cat',
    label: 'cat',
    ipa: '/æ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['cat', 'apple', 'man', 'black'],
    description: 'Short near-open front unrounded vowel. Wide open mouth, tongue low and forward.'
  },
  {
    id: 'up',
    label: 'up',
    ipa: '/ʌ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['up', 'cup', 'sun', 'love'],
    description: 'Short open-mid back unrounded vowel. Relaxed open jaw, tongue slightly back.'
  },
  {
    id: 'far',
    label: 'far',
    ipa: '/ɑː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['far', 'car', 'heart', 'calm'],
    description: 'Long open back unrounded vowel. Wide open jaw, back of tongue lowered.'
  },
  {
    id: 'on',
    label: 'on',
    ipa: '/ɒ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['on', 'hot', 'dog', 'box'],
    description: 'Short open back rounded vowel. Jaw low, lips open and rounded.'
  },

  // Diphthongs (8)
  {
    id: 'here',
    label: 'here',
    ipa: '/ɪə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['here', 'ear', 'near', 'beer'],
    description: 'Centering diphthong gliding from /ɪ/ toward schwa /ə/.'
  },
  {
    id: 'wait',
    label: 'wait',
    ipa: '/eɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['wait', 'day', 'train', 'face'],
    description: 'Closing diphthong gliding from /e/ toward /ɪ/.'
  },
  {
    id: 'cure',
    label: 'cure',
    ipa: '/ʊə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['cure', 'tour', 'pure', 'sure'],
    description: 'Centering diphthong gliding from /ʊ/ toward schwa /ə/.'
  },
  {
    id: 'boy',
    label: 'boy',
    ipa: '/ɔɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['boy', 'coin', 'voice', 'toy'],
    description: 'Closing diphthong gliding from /ɔː/ toward /ɪ/.'
  },
  {
    id: 'show',
    label: 'show',
    ipa: '/əʊ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['show', 'go', 'home', 'boat'],
    description: 'Closing diphthong gliding from schwa /ə/ toward /ʊ/.'
  },
  {
    id: 'hair',
    label: 'hair',
    ipa: '/eə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['hair', 'care', 'bear', 'there'],
    description: 'Centering diphthong gliding from /e/ toward schwa /ə/.'
  },
  {
    id: 'my',
    label: 'my',
    ipa: '/aɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['my', 'fly', 'time', 'eye'],
    description: 'Closing diphthong gliding from /a/ toward /ɪ/.'
  },
  {
    id: 'cow',
    label: 'cow',
    ipa: '/aʊ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['cow', 'now', 'house', 'mouth'],
    description: 'Closing diphthong gliding from /a/ toward /ʊ/.'
  },

  // Consonants - Plosives (6)
  {
    id: 'pea',
    label: 'pea',
    ipa: '/p/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['pea', 'pen', 'stop', 'happy'],
    description: 'Voiceless bilabial stop. Lips pressed firmly together then released with a puff of air.'
  },
  {
    id: 'boat',
    label: 'boat',
    ipa: '/b/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['boat', 'bed', 'big', 'cab'],
    description: 'Voiced bilabial stop. Vocal cords vibrate as lips release trapped air.'
  },
  {
    id: 'tea',
    label: 'tea',
    ipa: '/t/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['tea', 'time', 'cat', 'water'],
    description: 'Voiceless alveolar stop. Tongue tip against alveolar ridge behind upper teeth.'
  },
  {
    id: 'dog',
    label: 'dog',
    ipa: '/d/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['dog', 'day', 'red', 'under'],
    description: 'Voiced alveolar stop. Tongue tip against alveolar ridge with vocal cord vibration.'
  },
  {
    id: 'car',
    label: 'car',
    ipa: '/k/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['car', 'cat', 'black', 'key'],
    description: 'Voiceless velar stop. Back of tongue touches soft palate (velum).'
  },
  {
    id: 'go',
    label: 'go',
    ipa: '/ɡ/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['go', 'good', 'dog', 'big'],
    description: 'Voiced velar stop. Back of tongue against velum with vocal vibration.'
  },

  // Consonants - Affricates (2)
  {
    id: 'cheese',
    label: 'cheese',
    ipa: '/tʃ/',
    category: 'consonant_affricate',
    categoryLabel: 'Affricate (Unvoiced)',
    exampleWords: ['cheese', 'chair', 'match', 'picture'],
    description: 'Voiceless postalveolar affricate. Begins like /t/ and releases into /ʃ/.'
  },
  {
    id: 'june',
    label: 'june',
    ipa: '/dʒ/',
    category: 'consonant_affricate',
    categoryLabel: 'Affricate (Voiced)',
    exampleWords: ['june', 'judge', 'jump', 'age'],
    description: 'Voiced postalveolar affricate. Begins like /d/ and releases into /ʒ/ with voice.'
  },

  // Consonants - Fricatives (8)
  {
    id: 'fly',
    label: 'fly',
    ipa: '/f/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['fly', 'far', 'fish', 'coffee'],
    description: 'Voiceless labiodental fricative. Upper front teeth lightly touch lower lip.'
  },
  {
    id: 'video',
    label: 'video',
    ipa: '/v/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['video', 'voice', 'live', 'leave'],
    description: 'Voiced labiodental fricative. Upper teeth on lower lip with vocal vibration.'
  },
  {
    id: 'think',
    label: 'think',
    ipa: '/θ/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['think', 'three', 'bath', 'mouth'],
    description: 'Voiceless dental fricative. Tongue tip placed gently between upper and lower teeth.'
  },
  {
    id: 'this',
    label: 'this',
    ipa: '/ð/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['this', 'that', 'they', 'mother'],
    description: 'Voiced dental fricative. Tongue tip between teeth with vocal vibration.'
  },
  {
    id: 'see',
    label: 'see',
    ipa: '/s/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['see', 'sun', 'city', 'yes'],
    description: 'Voiceless alveolar fricative. Air forced through narrow channel over tongue tip.'
  },
  {
    id: 'zoo',
    label: 'zoo',
    ipa: '/z/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['zoo', 'zero', 'buzz', 'easy'],
    description: 'Voiced alveolar fricative. Like /s/ but with vocal cord vibration.'
  },
  {
    id: 'shall',
    label: 'shall',
    ipa: '/ʃ/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['shall', 'ship', 'shoe', 'fish'],
    description: 'Voiceless postalveolar fricative. Blade of tongue near back of alveolar ridge.'
  },
  {
    id: 'television',
    label: 'television',
    ipa: '/ʒ/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['television', 'measure', 'vision', 'beige'],
    description: 'Voiced postalveolar fricative. Like /ʃ/ but with vocal cord vibration.'
  },

  // Consonants - Nasals (3)
  {
    id: 'man',
    label: 'man',
    ipa: '/m/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['man', 'my', 'me', 'come'],
    description: 'Voiced bilabial nasal. Both lips closed; air escapes freely through the nose.'
  },
  {
    id: 'now',
    label: 'now',
    ipa: '/n/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['now', 'no', 'sun', 'night'],
    description: 'Voiced alveolar nasal. Tongue tip against alveolar ridge; air through nose.'
  },
  {
    id: 'singer',
    label: 'singer',
    ipa: '/ŋ/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['singer', 'sing', 'long', 'think'],
    description: 'Voiced velar nasal. Back of tongue touches soft palate; air flows through nose.'
  },

  // Consonants - Approximants / Glottal (5)
  {
    id: 'hat',
    label: 'hat',
    ipa: '/h/',
    category: 'consonant_fricative',
    categoryLabel: 'Glottal Fricative',
    exampleWords: ['hat', 'here', 'hot', 'home'],
    description: 'Voiceless glottal fricative. Breath exhaled through open vocal cords.'
  },
  {
    id: 'love',
    label: 'love',
    ipa: '/l/',
    category: 'consonant_approximant',
    categoryLabel: 'Lateral Approximant',
    exampleWords: ['love', 'look', 'light', 'ball'],
    description: 'Voiced alveolar lateral approximant. Tongue tip on ridge, air flows around sides.'
  },
  {
    id: 'red',
    label: 'red',
    ipa: '/r/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['red', 'run', 'read', 'right'],
    description: 'Voiced postalveolar approximant. Tongue curled back without touching palate.'
  },
  {
    id: 'wet',
    label: 'wet',
    ipa: '/w/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['wet', 'wait', 'we', 'water'],
    description: 'Voiced labial-velar approximant. Lips rounded, back of tongue raised.'
  },
  {
    id: 'yes',
    label: 'yes',
    ipa: '/j/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['yes', 'yellow', 'you', 'year'],
    description: 'Voiced palatal approximant. Tongue near hard palate, gliding into vowel.'
  }
];

export const SOUNDS_BY_ID = new Map<string, SoundData>(
  ALL_SOUNDS.map((s) => [s.id, s])
);

export const ALL_SOUND_IDS: string[] = ALL_SOUNDS.map((s) => s.id);
