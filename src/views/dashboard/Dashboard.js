import React from 'react';
import { Container, Grid, } from '@mui/material';
import TopCards from 'src/components/topcards/TopCards';
import RevenueUpdates from 'src/components/revenue-updates/RevenueUpdates';

import MonthlyEarnings from 'src/components/monthly-earnings/MonthlyEarnings';
import YearlyBreakup from 'src/components/yearly-breakup/YearlyBreakup';




const Dashboard = () => {
    return (

        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>

                {/* Main Content */}
                <Grid item sm={12} lg={12}>
                    <TopCards />
                </Grid>
                




                {/* Sidebar */}
                <Grid item xs={12} lg={8}>
                    <RevenueUpdates />
                </Grid>

                <Grid item xs={12} sm={6} lg={4} >
                    <Grid item xs={12} sm={12} lg={12} sx={{mb: 5}}>
                        <YearlyBreakup />
                    </Grid>

                    <Grid item xs={12} sm={12} lg={12}>
                        <MonthlyEarnings />
                    </Grid>

                </Grid>


              
            </Grid>
        </Container>

    );
};

export default Dashboard;