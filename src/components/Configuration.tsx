"use client";

import { colors } from '@/util/colorTheme';
import { Grid, Paper, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Configuration = () => {
    const router = useRouter();
    const [url, setURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ url?: string }>({});

    const validateURL = (url: string) => {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
        );
        return !!pattern.test(url);
    };

    const handleDownloadDB = async () => {
        // Validación inicial
        const newErrors: { url?: string } = {};
        
        if (!url) {
            newErrors.url = 'La URL no puede estar vacía';
        } else if (!validateURL(url)) {
            newErrors.url = 'URL no válida';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        
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
            <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div" sx={{ position: 'relative' }}>
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1, backgroundColor: '#714B67' }}>
                    <Grid>
                        <Button
                            startIcon={<i className="ri-arrow-left-circle-line"></i>}
                            sx={{ mt: 2, color: '#f7f0f5' }}
                            onClick={() => router.push('/')}
                            fullWidth
                        >
                            Volver
                        </Button>
                    </Grid>
                    <Typography variant="h5" fontWeight={600} sx={{ color: 'primary.contrastText', mb: 2, fontFamily: "'Poppins', sans-serif" }}>
                        Configuración
                    </Typography>
                    <TextField
                        fullWidth
                        type='url'
                        placeholder='https://test-codemon.demos-odoo.com/'
                        value={url}
                        onChange={(e) => {
                            setURL(e.target.value);
                            setErrors({}); // Limpiar errores al cambiar
                        }}
                        error={!!errors.url}
                        helperText={errors.url}
                        sx={{ 
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '&.Mui-focused fieldset': {
                                    borderColor: validateURL(url) ? 'red !important' : '#38866C !important',
                                },
                            },
                        }}
                        
                    />
                    <Button
                        variant="contained"
                        startIcon={<i className="ri-save-line"></i>}
                        sx={{
                            backgroundColor: colors.success.default, 
                            '&:hover': { 
                                backgroundColor: `${colors.success.default}CC` 
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