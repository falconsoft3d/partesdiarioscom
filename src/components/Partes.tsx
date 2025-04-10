"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, Avatar } from '@mui/material';
// import CerrarSesion from './CerrarSesion';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/util/colorTheme';
import { decryptData } from '@/util/encrypt';

const Partes = () => {
    const router = useRouter();
    const { isAuthenticated,user } = useAuth();
    useEffect(() => {
        
        // if (!isAuthenticated) {
        //         router.push('/login')
        //     }
       
      }, [])
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2 }}>
            <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div" sx={{ position: 'relative' }}>
                {/* <Box
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
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1,backgroundColor: '#714B67' }}>
                {/* <CerrarSesion/> */}
                    {/* Ícono centrado arriba */}
                    <Box  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',color: '#f7f0f5' ,alignItems: 'center' }}>
                    <Avatar  sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="/images/avatar/1.png" />
    <Typography variant="h6" sx={{  color: 'primary.contrastText', 
                mb: 2,
                fontFamily: "'Poppins', sans-serif" }}>
        {decryptData(user.partesDiarios_usuario)}
    </Typography>
</Box>


<Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-home-7-fill"></i>}
                            onClick={() => router.push('/home')}
                            fullWidth
                            sx={{
                              
                                backgroundColor: colors.success.default, 
                                '&:hover': { 
                                    backgroundColor: `${colors.success.default}CC` 
                                },
                                borderRadius: '5px'
                            }}
                        >
                            Inicio
                        </Button>
                    </Box>  

                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-user-2-line"></i>}
                            onClick={() => router.push('/empleados')}
                            fullWidth
                            sx={{
                              
                                backgroundColor: colors.success.default, 
                                '&:hover': { 
                                    backgroundColor: `${colors.success.default}CC` 
                                },
                                borderRadius: '5px'
                            }}
                        >
                            Empleados
                        </Button>
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-team-fill"></i>}
                             onClick={() => router.push('/equipos')}
                            fullWidth
                            sx={{
                              
                                backgroundColor: colors.success.default, 
                                '&:hover': { 
                                    backgroundColor: `${colors.success.default}CC` 
                                },
                                borderRadius: '5px'
                            }}
                        >
                            Equipos
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-line-chart-line"></i>}
                            onClick={() => router.push('/lineavance')}
                            fullWidth
                            sx={{
                              
                                backgroundColor: colors.success.default, 
                                '&:hover': { 
                                    backgroundColor: `${colors.success.default}CC` 
                                },
                                borderRadius: '5px'
                            }}
                        >
                            Linea de Avance
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-time-line"></i>}
                            //onClick={() => router.push('/config')}
                            fullWidth
                            sx={{
                              
                                backgroundColor: colors.success.default, 
                                '&:hover': { 
                                    backgroundColor: `${colors.success.default}CC` 
                                },
                                borderRadius: '5px'
                            }}
                        >
                            Horas Perdidas
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-message-2-line"></i>}
                            onClick={() => router.push('/comentarios')}
                            fullWidth
                            sx={{
                              
                                backgroundColor: colors.success.default, 
                                '&:hover': { 
                                    backgroundColor: `${colors.success.default}CC` 
                                },
                                borderRadius: '5px'
                            }}
                        >
                            Comentarios
                        </Button>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-multi-image-line"></i>}
                            onClick={() => router.push('/fotos')}
                            fullWidth
                            sx={{
                              
                                backgroundColor: colors.success.default, 
                                '&:hover': { 
                                    backgroundColor: `${colors.success.default}CC` 
                                },
                                borderRadius: '5px'
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
