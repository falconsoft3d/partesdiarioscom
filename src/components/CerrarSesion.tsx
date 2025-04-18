import { useAuth } from '@/context/AuthContext';
import { colors } from '@/util/colorTheme';
import { Box, Fab } from '@mui/material';

import React from 'react'
import Swal from 'sweetalert2';

const CerrarSesion = () => {

    const { logout } = useAuth();
    const handleLogout = async () => {
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: "¿Quieres cerrar sesión?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cerrar sesión!',
          cancelButtonText: 'Cancelar'
        });
    
        if (result.isConfirmed) {
            logout();
          Swal.fire('Cerrado!', 'Has cerrado sesión con éxito.', 'success');
        }
      };
    return (
        <Box  sx={{ display: 'flex', justifyContent: 'flex-end' }} >
        <Fab onClick={handleLogout}  sx={{
                              color:'#fff',
                              backgroundColor: colors.success.default, 
                              '&:hover': { 
                                  backgroundColor: `${colors.success.default}CC` 
                              },
                             
                          }} title='Cerrar sesion' aria-label="add">
<i className='ri-logout-box-line text-white'></i>
</Fab>
        </Box>
    )
  }

  export default CerrarSesion;