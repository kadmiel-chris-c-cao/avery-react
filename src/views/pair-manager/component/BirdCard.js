import React from 'react';
import { Card, Grid, Badge, Typography } from '@mui/material';

const BirdCard = ({ bird, index, nest, dateOfBeginning, color }) => {
    return (
        <Card sx={{
            padding: 1,
            borderRadius: 1,
            boxShadow: 1,
            backgroundColor: color,
        }}>
            <Grid container spacing={2}>
                {/* Row 1: Badge */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', marginTop: 1 }}>
                    <Badge
                        color={bird.status === 'Active' ? 'success' : bird.status === 'Dead' ? 'error' : 'default'}
                        badgeContent={bird.status}
                        sx={{
                            fontWeight: 'bold',
                            '.MuiBadge-badge': {
                                fontSize: '0.7rem',
                                height: '16px',
                                minWidth: '15px',
                                borderRadius: '20px',
                                right: '20px',
                            }
                        }}
                    />
                </Grid>

                {/* Row 2: Image and Description */}
                <Grid item xs={12}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        sx={{ minHeight: '24vh', textAlign: 'center' }}
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <img
                                src={bird.imageUrl}
                                alt={bird.name}
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    borderRadius: '9px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>{bird.name}</Typography>
                            <Typography variant="body2" gutterBottom><b>Band Number:</b> {bird.bandNumber}</Typography>
                            <Typography variant="body2" gutterBottom><b>Gender:</b> {bird.sex}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Card>
    );
};

export default BirdCard;
