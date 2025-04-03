"use client";

import { useRouter } from 'next/navigation';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';

import React from 'react';
import { colors } from '@/util/colorTheme';

const Home = () => {
    const router = useRouter();

    return (
        <Grid  container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', padding: '1rem' ,backgroundColor: '#E3D5DF'}}>
           
            <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div" sx={{ position: 'relative' }}>
                 {/* Fondo degradado con sombra detrás del Paper
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
                /> */}
                <Paper elevation={4} sx={{ padding: 4, borderRadius: 4, textAlign: 'center', position: 'relative' ,backgroundColor: '#714B67'}}>
                    {/* Ícono centrado arriba */}
                    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-12 h-12 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 8h10M7 12h10m-6 4h6M6 3h12l3 3v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6l2-3z"
                            />
                        </svg>
                    </Box>
                    
                    <Typography variant="h5" fontWeight={600} sx={{  color: 'primary.contrastText', 
                mt: 2,
                fontFamily: "'Poppins', sans-serif" }}>
                        Partes Diarios
                    </Typography>
                    
                    <Typography variant="body1" sx={{  color: 'primary.contrastText', 
                mt: 2,
                fontFamily: "'Poppins', sans-serif" }}>
                        Bienvenidos a la Gestión de Partes
                    </Typography>
                    
                    <Button
                        variant="contained"                       
                        startIcon={ <i className="ri-settings-5-fill"></i>}
                        sx={{
                            mt:3,  
                            backgroundColor: colors.success.default, 
                            '&:hover': { 
                                backgroundColor: `${colors.success.default}CC` 
                            },
                            borderRadius: '5px'
                        }}
                        onClick={() => router.push('/config')}
                        fullWidth
                    >
                        Configuración
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Home;
