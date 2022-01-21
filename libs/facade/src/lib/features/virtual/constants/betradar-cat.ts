import { Virtual } from '../entity/virtual.interface';
import { generateVirtualCategory } from '../functions/functions';

export const BETRADAR_FIRST: Virtual[] = [
  generateVirtualCategory(
    'betradar',
    'assets/icons/virtual/betradar/betradar.png',
    '#'
  )
];

export const BETRADAR_CATS: Virtual[] = [
  generateVirtualCategory(
    'virtual_football',
    'assets/icons/virtual/betradar/betradar-football.png',
    '#',
    'assets/icons/virtual/betradar/betradar-logo.png'
  ),
  generateVirtualCategory(
    'virtual_tennis',
    'assets/icons/virtual/betradar/betradar-tennis.png',
    '#',
    'assets/icons/virtual/betradar/betradar-logo.png'
  ),
  generateVirtualCategory(
    'virtual_basketball',
    'assets/icons/virtual/betradar/betradar-basketball.png',
    '#',
    'assets/icons/virtual/betradar/betradar-logo.png'
  )
];
