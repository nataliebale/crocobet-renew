import { Virtual } from '../entity/virtual.interface';
import { generateVirtualCategory } from '../functions/functions';

export const GOLDEN_RACE_FIRST: Virtual[] = [
  generateVirtualCategory(
    'golden race',
    'assets/icons/virtual/golden-race/golden-race.png',
    '#'
  )
];

export const GOLDEN_RACE_CAT: Virtual[] = [
  generateVirtualCategory(
    'virtual_moto_race',
    'assets/icons/virtual/golden-race/golden-race-moto.png',
    '#',
    'assets/icons/virtual/golden-race/goldenrace-logo.png'
  ),
  generateVirtualCategory(
    'virtual_dog_race',
    'assets/icons/virtual/golden-race/golden-race-dog.png',
    '#',
    'assets/icons/virtual/golden-race/goldenrace-logo.png'
  ),
  generateVirtualCategory(
    'virtual_horse_race',
    'assets/icons/virtual/golden-race/golden-race-horse.png',
    '#',
    'assets/icons/virtual/golden-race/goldenrace-logo.png'
  )
];
