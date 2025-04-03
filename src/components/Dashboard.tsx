"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';

const Dashboard = () => {
    const router = useRouter();
    
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2, backgroundColor: '#E3D5DF' }}>
            <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div" sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-5px',
                        left: '-5px',
                        right: '-5px',
                        bottom: '-5px',
                        background: 'linear-gradient(to right, #A07698, #714B67)',
                        boxShadow: 5,
                        transform: 'skewY(-5deg) rotate(-5deg)',
                        borderRadius: 4,
                        zIndex: 0,
                    }}
                />
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    {/* Ícono centrado arriba */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 4 }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-12 h-12 text-blue-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 8h10M7 12h10m-6 4h6M6 3h12l3 3v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6l2-3z"
                            />
                        </svg>
                    </Box>

                    <Typography variant="h6" color="text.primary" mb={2}>
                        Partes Diarios
                    </Typography>

                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-arrow-down-line"></i>}
                            onClick={() => router.push('/partes')}
                            fullWidth
                            sx={{
                                backgroundColor: '#714B67',
                                '&:hover': { backgroundColor: '#7eadf3' },
                                borderRadius: '100px',
                                mb: 2,
                            }}
                        >
                            Bajar Parte
                        </Button>
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-arrow-up-line"></i>}
                            onClick={() => router.push('/partes')}
                            fullWidth
                            sx={{
                                backgroundColor: '#714B67',
                                '&:hover': { backgroundColor: '#7eadf3' },
                                borderRadius: '100px',
                            }}
                        >
                            Subir Parte
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
