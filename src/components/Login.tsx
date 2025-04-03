'use client';

import { Grid, Paper, Typography, Button,  TextField, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ApiResponse, FormattedUser } from '../util/types';
import { validateUserField } from '@/util/validation';
import useHttpCustomService from '@/services/HttpCustomService';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useUrl } from '@/context/UrlContext';
import { useAuth } from '@/context/AuthContext';

// Función simple de encriptación (solo para demostración)
const encryptPassword = (password: string) => {
    return btoa(password) // Esto es una codificación en Base64, no una encriptación segura
  }

const Login = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<FormattedUser>({
        id: 0,
        login: '',
        password: '',
        url: ''
    });
    const { post } = useHttpCustomService();
    const { setApiUrl,apiUrl } = useUrl();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const { login,isAuthenticated } = useAuth();

    useEffect(() => {
        // Cargar datos guardados al iniciar el componente
        const savedUrl = localStorage.getItem("partesDiarios_url")
               
        if (savedUrl) setApiUrl(savedUrl)
        if (isAuthenticated) {
                router.push('/home')
            }
       
      }, [])




    const submitLogin = async () => {
        try {
setIsLoading(true)

            const response = await post<ApiResponse, FormattedUser>(`${apiUrl}/bim/diary-part-offline/pwa/login`, formData);

            if (response.result.status === 'ok') {
                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: '!Logeado!',
                    text: "Usuario logeado correctamente",
                });
                localStorage.setItem("partesDiarios_usuario", formData.login)
                localStorage.setItem("partesDiarios_contrasena", encryptPassword(formData.password))                
                console.log("Configuración guardada en localStorage")
                login(formData.login, encryptPassword(formData.password), apiUrl);
            } else {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Usuario o contraseña incorrectos",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Ocurrió un problema en el login: ${error}`,
            });
        }finally {
            setIsLoading(false);
        }
    };
    const handleClickShowPassword = () => setIsPasswordShown(show => !show)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    
        const error = validateUserField(name, value);
    
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2, backgroundColor: '#E3D5DF' }}>
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
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, position: 'relative', zIndex: 1 ,backgroundColor: '#714B67'}}>
                    <Button
                        startIcon={<i className="ri-arrow-left-circle-line"></i>}
                        sx={{ mb: 3, color: '#f7f0f5' }}
                        onClick={() => router.push('/')}
                        fullWidth
                    >
                        Volver
                    </Button>
                    <Typography variant="h5" fontWeight={600} sx={{  color: 'primary.contrastText', 
                mb: 2,
                fontFamily: "'Poppins', sans-serif" }}>
                        Login
                    </Typography>
                    <TextField
                        fullWidth
                        label="Correo"
                        type="email"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}                    
                        error={!!errors.login}
                        helperText={errors.login}
                        disabled={isLoading}
                        sx={{ mb: 3 }}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  size='small'
                                  edge='end'
                                
                                >
                                  <i className={'ri-mail-line'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type={isPasswordShown ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        disabled={isLoading}
                        sx={{ mb: 3 }}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  size='small'
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={e => e.preventDefault()}
                                >
                                  <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                    />
                    <Link href="/changepw" style={{ display: 'block', marginBottom: '16px', textAlign: 'center' ,color: '#f7f0f5'}}>
                        Cambiar contraseña
                    </Link>
                    <Button
                        variant="contained"
                        startIcon={<i className="ri-login-box-line"></i>}
                        sx={{
                            mt: 3,
                            backgroundColor: '#4A6B57', 
                            '&:hover': { 
                                backgroundColor: '#7A9B82' 
                            },
                            borderRadius: '5px'
                        }}
                        onClick={submitLogin}
                        fullWidth
                    >
                         {isLoading ? (
                            <>
                                <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                                Por favor espere…
                            </>
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
