import {
  //IconStar,
  IconAperture,
  IconClipboardList,
  IconDeviceDesktopAnalytics,
  IconLayoutBoard,
  IconHeart,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
    //chip: 'New',
    chipColor: 'secondary',
  },


  {
    navlabel: true,
    subheader: 'Dashboard',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconDeviceDesktopAnalytics,
    href: '/dashboard',
    //chip: 'New',
    chipColor: 'secondary',
  },

  {
    id: uniqueId(),
    title: 'Bird Manager',
    icon: IconLayoutBoard,
    href: '/bird-manager',
    //chip: 'New',
    chipColor: 'secondary',
  },

  {
    id: uniqueId(),
    title: 'Bird Pair',
    icon: IconHeart,
    href: '/pair-manager',
    //chip: 'New',
    chipColor: 'secondary',
  },


  {
    id: uniqueId(),
    title: 'Bird Library',
    icon: IconClipboardList,
    href: '/bird-library',
    chip: 'New',
    chipColor: 'secondary',
  },









  
  //{
   //id: uniqueId(),
    //title: 'External Link',
    //external: true,
    //icon: IconStar,
    //href: 'https://google.com',
  //},
];

export default Menuitems;
