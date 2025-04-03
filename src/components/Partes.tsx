"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';

const Partes = () => {
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
                    <Box  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <i className='ri-home-7-fill cursor-pointer' onClick={()=>router.push('/home')}></i>
    <Typography variant="h6" color="text.primary">
        Inicio
    </Typography>
</Box>


                   

                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-user-2-line"></i>}
                            onClick={() => router.push('/config')}
                            fullWidth
                            sx={{
                                backgroundColor: '#714B67',
                                '&:hover': { backgroundColor: '#7eadf3' },
                                borderRadius: '100px',
                                
                            }}
                        >
                            Empleados
                        </Button>
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-team-fill"></i>}
                            onClick={() => router.push('/config')}
                            fullWidth
                            sx={{
                                backgroundColor: '#714B67',
                                '&:hover': { backgroundColor: '#7eadf3' },
                                borderRadius: '100px',
                            }}
                        >
                            Equipos
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-line-chart-line"></i>}
                            onClick={() => router.push('/config')}
                            fullWidth
                            sx={{
                                backgroundColor: '#714B67',
                                '&:hover': { backgroundColor: '#7eadf3' },
                                borderRadius: '100px',
                            }}
                        >
                            Linea de Avance
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-time-line"></i>}
                            onClick={() => router.push('/config')}
                            fullWidth
                            sx={{
                                backgroundColor: '#714B67',
                                '&:hover': { backgroundColor: '#7eadf3' },
                                borderRadius: '100px',
                            }}
                        >
                            Horas Perdidas
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-message-2-line"></i>}
                            onClick={() => router.push('/config')}
                            fullWidth
                            sx={{
                                backgroundColor: '#714B67',
                                '&:hover': { backgroundColor: '#7eadf3' },
                                borderRadius: '100px',
                            }}
                        >
                            Comentarios
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-multi-image-line"></i>}
                            onClick={() => router.push('/config')}
                            fullWidth
                            sx={{
                                backgroundColor: '#714B67',
                                '&:hover': { backgroundColor: '#7eadf3' },
                                borderRadius: '100px',
                            }}
                        >
                            Fotos
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Partes;
