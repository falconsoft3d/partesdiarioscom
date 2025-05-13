
'use client';

import { Grid, Paper, Typography, Button,  TextField, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ApiResponse, FormattedUser, UsuarioCreadoResponse } from '../util/types';
import { validateUserField } from '@/util/validation';
import useHttpCustomService from '@/services/HttpCustomService';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/util/colorTheme';
import { encryptData, encryptPassword } from '@/util/encrypt';
import { guardarUsuario } from '@/app/api/usuarios/services/usuariosService';


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
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const { login,isAuthenticated } = useAuth();

    useEffect(() => {
        
        if (isAuthenticated) {
                router.push('/home')
            }
       
      }, [])




    const submitLogin = async () => {
        // Validar campos primero
    const newErrors: Record<string, string> = {};
    
    // Validar login
    const loginError = validateUserField('login', formData.login);
    if (loginError) newErrors.login = loginError;
    
    // Validar contraseña
    const passwordError = validateUserField('password', formData.password);
    if (passwordError) newErrors.password = passwordError;
      // Validar contraseña
      const urlError = validateUserField('url', formData.url);
      if (urlError) newErrors.url = urlError;
      
    
    // Si hay errores, mostrar alerta y actualizar estado
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        Swal.fire({
            icon: 'error',
            title: 'Error de validación',
            html: `
                <div style="text-align: left;">
                    <strong>Errores encontrados:</strong>
                    <ul style="margin-top: 10px;">
                        ${Object.values(newErrors).map(error => `<li>${error}</li>`).join('')}
                    </ul>
                </div>
            `,
            confirmButtonColor: '#38866C',
        });
        return;
    }
        try {
setIsLoading(true)
console.log(formData);
            const response = await post<ApiResponse, FormattedUser>(`${formData.url}bim/diary-part-offline/pwa/login`, formData);
console.log(response);

            if (response.result.status === 'ok') {
              
                const hashedPassword = await encryptPassword(formData.password);       
                console.log("Configuración guardada en localStorage")
                const userG:UsuarioCreadoResponse = await guardarUsuario({
                    usuario: encryptData(formData.login),
                    password: hashedPassword,
                    url: encryptData(formData.url),
                    parte_json:''
                  });
                  console.log(userG);
                  
                login(encryptData(formData.login), hashedPassword, encryptData(formData.url),userG.user.lastInsertRowid);
                // Luego llamás al servicio para guardar en SQLite

  setIsLoading(false)
  Swal.fire({
      icon: 'success',
      title: '!Logeado!',
      text: "Usuario logeado correctamente",
      showConfirmButton: false,
      timer: 3000,
  });
            } else {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Usuario o contraseña incorrectos",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Ocurrió un problema en el login: ${error}`,
                showConfirmButton: false,
                timer: 3000,
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
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2}}>
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
                        Configuración
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Tu Correo"
                        type="email"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}                    
                        error={!!errors.login}
                        helperText={errors.login}
                        disabled={isLoading}
                        sx={{ 
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '&.Mui-focused fieldset': {
                                    borderColor: '#38866C !important',
                                },
                                
                            }, '& .MuiFormHelperText-root': {
                                color: 'white !important', // Añade !important
                                fontSize: '0.875rem' // Opcional: ajusta tamaño
                            },
                        }}
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
                        
                        placeholder="Tu Contraseña"
                        type={isPasswordShown ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        disabled={isLoading}
                        sx={{ 
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '&.Mui-focused fieldset': {
                                    borderColor: '#38866C !important',
                                },
                                
                            
                            }, '& .MuiFormHelperText-root': {
                                color: 'white !important', // Añade !important
                                fontSize: '0.875rem' // Opcional: ajusta tamaño
                            },
                        }}
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
                    <TextField
    fullWidth
    disabled={isLoading}
    type='url'
    placeholder='https://test-codemon.demos-odoo.com/'
    name="url"
    value={formData.url}
    onChange={handleChange}
    error={Boolean(errors.url)}
    helperText={errors.url ? errors.url : " "}
    sx={{ 
        mb: 3,
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '8px',
            '&.Mui-focused fieldset': {
                borderColor:  '#38866C !important',
            },
        },
        '& .MuiFormHelperText-root': {
            color: 'white !important', // Añade !important
            fontSize: '0.875rem' // Opcional: ajusta tamaño
        },
    }}
/>

                    
                    <Link href="/changepw" style={{ display: 'block', marginBottom: '16px', textAlign: 'center' ,color: '#f7f0f5'}}>
                        Cambiar contraseña
                    </Link>
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
                        onClick={submitLogin}
                        fullWidth
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

export default Login;
