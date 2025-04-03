"use client";

import { Grid, Paper, Typography, Button, Box, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Configuration = () => {
    const router = useRouter();
    const [url, setURL] = useState('');

    const handleDownloadDB = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "La URL no puede ser vacía",
            });  
            return;
        }
        const response = await fetch('/partesdiarios.sql');
        const blob = await response.blob();
        const urld = window.URL.createObjectURL(blob);
        localStorage.setItem("partesDiarios_urlDB", urld)
        localStorage.setItem("partesDiarios_url", url)
        console.log("Configuración guardada en localStorage")
        router.push('/login');
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2, backgroundColor: '#E3D5DF' }}>
           
            <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div"  sx={{ position: 'relative' }}>
                {/* Fondo degradado con sombra detrás del Paper */}
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
                <Grid> <Button
                startIcon={ <i className="ri-arrow-left-circle-line"></i>}
                        sx={{ mt: 2, color: '#714B67' }}
                        onClick={() => router.push('/')}
                        fullWidth
                    >
                        Volver
                    </Button></Grid>
                    <Typography variant="h5" fontWeight={600} color="text.primary" mb={2}>
                        Configuración
                    </Typography>
                    <TextField
                        fullWidth
                        label="URL"
                        type='url'
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="contained"
                        startIcon={ <i className="ri-save-line"></i>}
                        sx={{mt:3, backgroundColor: '#714B67', '&:hover': { backgroundColor: '#A07698' } ,borderRadius:'100px'}}
                        onClick={handleDownloadDB}
                        fullWidth
                    >
                        Guardar Configuración
                    </Button>
                   
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Configuration;
