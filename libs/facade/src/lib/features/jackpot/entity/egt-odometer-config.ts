import { EgtOdometerConfig } from './odometer.interface';

export const EgtOdometerConfigs: EgtOdometerConfig[] = [
  {
    index: 3,
    icon: 'slots-card-spades.png',
    listenToAnimation: true,
    level: 'LevelIV'
  },
  {
    index: 2,
    icon: 'slots-card-heart.png',
    listenToAnimation: false,
    level: 'LevelIII'
  },
  {
    index: 1,
    icon: 'slots-card-diamond.png',
    listenToAnimation: false,
    level: 'LevelII'
  },
  {
    index: 0,
    icon: 'slots-card-clubs.png',
    listenToAnimation: false,
    level: 'LevelI'
  }
];
