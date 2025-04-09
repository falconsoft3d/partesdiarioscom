'use client';

import { useUrl } from '@/context/UrlContext';
import useHttpCustomService from '@/services/HttpCustomService';
import { colors } from '@/util/colorTheme';
import { ApiResponse, FormattedChangePW } from '@/util/types';
import { validateChangePWField } from '@/util/validation';
import { Grid, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ChangePassword = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormattedChangePW>({
        login: '',
        password: '',
        "new-password": '',
        "conf-new-password": ''
    });
    const { apiUrl } = useUrl();
    const { post } = useHttpCustomService();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        const error = validateChangePWField(name, value, formData);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const submitChangePW = async () => {
        // Validar campos antes de enviar
    const newErrors: Record<string, string> = {};
    
    // Validar cada campo
    (Object.keys(formData) as Array<keyof FormattedChangePW>).forEach((field) => {
        const value = formData[field]!; // Non-null assertion
        const error = validateChangePWField(field, value, formData);
        if (error) newErrors[field] = error;
    });

    // Verificar si hay errores
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        Swal.fire({
            icon: 'error',
            title: 'Errores de validación',
            html: `
                <div style="text-align: left;">
                    <strong>Corrija los siguientes errores:</strong>
                    <ul style="margin-top: 10px;">
                        ${Object.values(newErrors).map(error => `<li>${error}</li>`).join('')}
                    </ul>
                </div>
            `,
            confirmButtonColor: colors.success.default,
        });
        return;
    }
        try {
            setIsLoading(true)
            const response = await post<ApiResponse, FormattedChangePW>(`${apiUrl}/bim/diary-part-offline/pwa/change-password`, formData);
            if (response.result.status === 'ok') {
                setIsLoading(false)
                Swal.fire({ icon: 'success', title: '!Actualizado!', text: "Contraseña actualizada correctamente", showConfirmButton: false,
                    timer: 3000, });
                router.push('/config');
            } else {
                setIsLoading(false)
                Swal.fire({ icon: 'error', title: 'Error', text: "Ocurrió un error al cambiar la contraseña", showConfirmButton: false,
                    timer: 3000, });
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: `Ocurrió un error al cambiar la contraseña: ${error}` , showConfirmButton: false,
                timer: 3000,});
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
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
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1 ,backgroundColor: '#714B67'}}>
                <Grid> <Button
                startIcon={ <i className="ri-arrow-left-circle-line"></i>}
                        sx={{ mt: 2, color: '#f7f0f5' }}
                        onClick={() => router.push('/config')}
                        fullWidth
                    >
                        Volver
                    </Button></Grid>
                    <Typography variant="h5" sx={{  color: 'primary.contrastText', 
                mb: 2,
                fontFamily: "'Poppins', sans-serif" }}>
                        Cambiar Contraseña
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{xs:12}} >
                            <TextField fullWidth placeholder="Correo" type="email" name="login" value={formData.login} onChange={handleChange} error={!!errors.login} helperText={errors.login}  sx={{ 
                            
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '&.Mui-focused fieldset': {
                                    borderColor: '#38866C !important',
                                },
                                
                            }, 
                            '& .MuiFormHelperText-root': {
                                color: 'white !important', // Añade !important
                                fontSize: '0.875rem' // Opcional: ajusta tamaño
                            },
                        }}/>
                        </Grid>
                        <Grid size={{xs:12}}>
                            <TextField fullWidth placeholder="Contraseña anterior" type="password" name="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} 
                            sx={{ 
                            
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#38866C !important',
                                    },
                                    
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'white !important', // Añade !important
                                    fontSize: '0.875rem' // Opcional: ajusta tamaño
                                },
                            }}/>
                        </Grid>
                        <Grid size={{xs:12}}>
                            <TextField fullWidth placeholder="Nueva Contraseña" type="password" name="new-password" value={formData['new-password']} onChange={handleChange} error={!!errors['new-password']} helperText={errors['new-password']} 
                            sx={{ 
                            
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#38866C !important',
                                    },
                                    
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'white !important', // Añade !important
                                    fontSize: '0.875rem' // Opcional: ajusta tamaño
                                },
                            }}/>
                        </Grid>
                        <Grid size={{xs:12}}>
                            <TextField fullWidth placeholder="Confirmar Nueva Contraseña" type="password" name="conf-new-password" value={formData['conf-new-password']} onChange={handleChange} error={!!errors['conf-new-password']} helperText={errors['conf-new-password']} 
                            sx={{ 
                            
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#38866C !important',
                                    },
                                    
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'white !important', // Añade !important
                                    fontSize: '0.875rem' // Opcional: ajusta tamaño
                                },
                            }}/>
                        </Grid>
                        <Grid size={{xs:12}}>
                            <Button fullWidth variant="contained"startIcon={ <i className="ri-lock-line"></i>}
                       sx={{
                              
                        backgroundColor: colors.success.default, 
                        '&:hover': { 
                            backgroundColor: `${colors.success.default}CC` 
                        },
                        borderRadius: '5px'
                    }}
                    onClick={submitChangePW}>
                         {isLoading ? (
                            <>
                                <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                                Por favor espere…
                            </>
                        ) : (
                            ' Cambiar contraseña'
                        )}
                               
                            </Button>
                        </Grid>
                       
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ChangePassword;
