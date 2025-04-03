"use client";

import { Grid, Paper, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Configuration = () => {
    const router = useRouter();
    const [url, setURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDownloadDB = async () => {
        setIsLoading(true);
        if (!url) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "La URL no puede ser vacía",
            });  
            return;
        }
    
        try {
            const response = await fetch('/partesdiarios.sql');
            const blob = await response.blob();
            const urld = window.URL.createObjectURL(blob);
            localStorage.setItem("partesDiarios_urlDB", urld);
            localStorage.setItem("partesDiarios_url", url);
            console.log("Configuración guardada en localStorage");
            router.push('/login');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `No se pudo descargar la base de datos: ${error}`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2, backgroundColor: '#E3D5DF' }}>
           
            <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div"  sx={{ position: 'relative' }}>
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
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1,backgroundColor: '#714B67' }}>
                <Grid> <Button
                startIcon={ <i className="ri-arrow-left-circle-line"></i>}
                        sx={{ mt: 2, color: '#f7f0f5' }}
                        onClick={() => router.push('/')}
                        fullWidth
                    >
                        Volver
                    </Button></Grid>
                    <Typography variant="h5" fontWeight={600}  sx={{  color: 'primary.contrastText', 
                mb: 2,
                fontFamily: "'Poppins', sans-serif" }}>
                        Configuración
                    </Typography>
                    <TextField
                        fullWidth
                        label="URL"
                        type='url'
                        placeholder='https://test-codemon.demos-odoo.com/'
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
                        sx={{ mb: 3 ,backgroundColor:'#F8F9FA',borderRadius:'5px'}}
                        InputLabelProps={{
                            style: { color: '#000' }
                          }}
                          inputProps={{
                            style: { 
                              color: '#000',
                              borderRadius: '12px'
                            }
                          }}
                    />
                   <Button
    variant="contained"
    startIcon={ <i className="ri-save-line"></i>}
    sx={{ 
        mt: 3, 
        backgroundColor: '#4A6B57', 
        '&:hover': { 
            backgroundColor: '#7A9B82' 
        },
        borderRadius: '5px'
    }}
    onClick={handleDownloadDB}
    fullWidth
    disabled={isLoading}
>
  
{isLoading ? (
                            <>
                                <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                                Por favor espere…
                            </>
                        ) : (
                            'Guardar Configuración'
                        )}
</Button>

                </Paper>
            </Grid>
        </Grid>
    );
};

export default Configuration;
