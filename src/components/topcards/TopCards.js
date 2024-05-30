import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CardContent, Grid, Typography } from '@mui/material';

import icon1 from 'src/assets/images/svgs/rare-birds.svg';
import icon2 from 'src/assets/images/svgs/total-of-birds.svg';
import icon3 from 'src/assets/images/svgs/paired.svg';
import icon4 from 'src/assets/images/svgs/dead-birds.svg';
import icon5 from 'src/assets/images/svgs/donated-birds.svg';
import icon6 from 'src/assets/images/svgs/birds-sold.svg';



const topcards = [
  {
    href: '/',
    icon: icon2,
    title: 'Total of Birds',
    digits: '300',
    bgcolor: 'primary',
  },
  {
    href: '/',
    icon: icon3,
    title: 'Paired',
    digits: '256',
    bgcolor: 'warning',
  },
  {
    href: '/',
    icon: icon4,
    title: 'Dead Birds',
    digits: '932',
    //bgcolor: 'secondary',
    bgcolor: 'error',
  },
  {
    href: '/',
    icon: icon5,
    title: 'Donated Birds',
    digits: '$348K',
    bgcolor: 'success',
    ///bgcolor: 'error',
  },

  {
  href: '/',
  icon: icon6,
  title: 'Birds Sold',
  digits: '150',
  bgcolor: 'warning',
  },

  {
  href: '/',
  icon: icon1,
  title: 'Rare Birds',
  digits: '48',
  bgcolor: 'info',
  },
];

// total of birds = #E3F6FF
// paired = #FBF1D3
// dead birds = #FFF0F5
// donated birds = #EBF3E8
// birds sold = #FBFFDC
// rare birds = #E3F6FF


const TopCards = () => {
  return (
    <Grid container spacing={3} mt={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={8} sm={4} lg={2} key={i}>
          <Link to={topcard.href}>
            <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
              <CardContent>
                <img src={topcard.icon} alt={topcard.icon} width="50" />
                <Typography
                  color={topcard.bgcolor + '.main'}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {topcard.title}
                </Typography>
                <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                  {topcard.digits}
                </Typography>
              </CardContent>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
