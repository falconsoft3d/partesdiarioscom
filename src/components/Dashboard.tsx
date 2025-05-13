
"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, CircularProgress } from '@mui/material';
import CerrarSesion from './CerrarSesion';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/util/colorTheme';
import { decryptData } from '@/util/encrypt';
import { ApiResponse } from '@/util/types';
import useHttpCustomService from '@/services/HttpCustomService';
import { modificarUsuario } from '@/app/api/usuarios/services/usuariosService';

const Dashboard = () => {
    const router = useRouter();
    const { isAuthenticated,user } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const { post } = useHttpCustomService(); 
    useEffect(() => {
        
        if (!isAuthenticated) {
                router.push('/config')
            }
       
      }, [])

      const handleBajarParte = async () => {
        setLoading(true);
        setError('');
      const url = decryptData(user.partesDiarios_url);   

      const usuario = decryptData(user.partesDiarios_usuario);
      const passw = decryptData(user.partesDiarios_contrasena);
      console.log(user.partesDiarios_contrasena);
      
        try {
          // Paso 1: Obtener parte desde Odoo
          const response = await  post<ApiResponse, any>(`${url}/bim/diary-part-offline/pwa/load-part`, {login:usuario,password:usuario});
      console.log(response);
      
          if (!response) throw new Error('Error al bajar el parte del servidor externo');
          
          const parte_json = await response.result;
      console.log(parte_json);
      modificarUsuario(user.id,{parte_json:parte_json.status})
        
        } catch (err: any) {
          setError(err.message || 'Ocurrió un error');
        } finally {
          setLoading(false);
        }
      };
      
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
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1 ,backgroundColor: '#714B67'}}>
                <CerrarSesion/>
                    {/* Ícono centrado arriba */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                           color='white'
                           width={150}
                           height={150}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 8h10M7 12h10m-6 4h6M6 3h12l3 3v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6l2-3z"
                            />
                        </svg>
                    </Box>

                    <Typography variant="h6" sx={{  color: 'primary.contrastText', 
                mb: 2,
                fontFamily: "'Poppins', sans-serif" }}>
                        Partes Diarios
                    </Typography>

                    <Box sx={{ p: 2 }}>
                    <Button
    variant="contained"
    startIcon={!loading && <i className="ri-arrow-down-line"></i>}
    onClick={handleBajarParte}
    fullWidth
    disabled={loading}
    sx={{
      backgroundColor: colors.success.default,
      '&:hover': {
        backgroundColor: `${colors.success.default}CC`
      },
      borderRadius: '5px',
      position: 'relative'
    }}
  >
    
    {loading ? (
      <>
      <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
      Por favor espere…
  </>
    ) : (
      'Bajar Parte'
    )}
  </Button>
  {error && (
    <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
      {error}
    </Typography>
  )}
                    </Box>

                    <Box sx={{ p: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<i className="ri-arrow-up-line"></i>}
                            // onClick={() => router.push('/partes')}
                            fullWidth
                            sx={{
                              
                                backgroundColor: colors.success.default, 
                                '&:hover': { 
                                    backgroundColor: `${colors.success.default}CC` 
                                },
                                borderRadius: '5px'
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
