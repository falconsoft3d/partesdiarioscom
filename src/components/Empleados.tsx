'use client'
import React, { useEffect, useState } from 'react'
import PageTransition from './ui/pageTransition'
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";

import {  Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import { Empleado } from '@/util/types';
import { colors } from '@/util/colorTheme';
import { useAuth } from '@/context/AuthContext';

 const Empleados = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        
        if (!isAuthenticated) {
                router.push('/config')
            }
       
      }, [])
    // Estado de empleados
  const [empleados, setEmpleados] = useState<Empleado[]>([
    { id: 1, nombre: "Juan Pérez", edad: 30, puesto: "Desarrollador" },
    { id: 2, nombre: "María López", edad: 28, puesto: "Diseñadora" },
  ]);

  // Estado de columnas dinámicas
  const [columnas, setColumnas] = useState<GridColDef[]>([
    { field: "nombre", headerName: "Empleado", width: 150, editable: false },
    { field: "edad", headerName: "Valor", width: 100, editable: true, type: "number" },
   
  ]);

  // Estado del nombre de la nueva columna
  const [nuevaColumna, setNuevaColumna] = useState("");

  // Función para agregar una nueva columna
  const agregarColumna = () => {
    if (nuevaColumna.trim() === "") return;

    const nuevaCol = {
      field: nuevaColumna.toLowerCase(),
      headerName: nuevaColumna,
      width: 100,
      editable: true,
    };

    setColumnas([...columnas, nuevaCol]);

    // Agregar la nueva propiedad a cada empleado
    setEmpleados((prev) =>
      prev.map((emp) => ({ ...emp, [nuevaColumna.toLowerCase()]: "" }))
    );

    setNuevaColumna("");
  };

  const handleEditCell = (updatedRow: GridRowModel) => {
    setEmpleados((prev) =>
      prev.map((emp) => 
        emp.id === updatedRow.id 
          ? { ...emp, ...updatedRow } // Aseguramos que mantenemos las propiedades de `Empleado`
          : emp
      )
    );
    return updatedRow; // Es importante devolver el objeto actualizado
};


    return (
        <PageTransition>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 2, backgroundColor: '#E3D5DF',width: "100%" }}>
            <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div" sx={{ position: 'relative' }}>
               
                <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1,backgroundColor: '#714B67' }}>
                {/* <CerrarSesion/> */}
                    {/* Ícono centrado arriba */}
                    <Box  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',color: '#f7f0f5' ,alignItems: 'center',width: "100%" }}>
                    <Button
                        startIcon={<i className="ri-arrow-left-circle-line"></i>}
                        sx={{ mb: 3, color: '#f7f0f5' }}
                        onClick={() => router.push('/partes')}
                        fullWidth
                    >
                        Volver
                    </Button>
    <Typography variant="h6" sx={{  color: 'primary.contrastText', 
                mb: 2,
                fontFamily: "'Poppins', sans-serif" }}>
      Empleados
    </Typography>
</Box>
<Box sx={{ width: "100%", height: 400,mb: 8 }}>
      <Box sx={{ display: "flex", width: "100%", gap: 2, mb: 2 }}>
        <TextField
          label="Nueva Columna"
          value={nuevaColumna}
          onChange={(e) => setNuevaColumna(e.target.value)}
          size="small"
          sx={{ 
           
            '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: '8px',
                '&.Mui-focused fieldset': {
                    borderColor:  '#38866C !important',
                },
            },
            '& .MuiFormHelperText-root': {
                color:  'white', // Solo muestra el texto en blanco si hay error
            },
        }}
        />
        <Button variant="contained"
          startIcon={<i className="ri-add-large-line"></i>}
        sx={{
                              
                              backgroundColor: colors.success.default, 
                              '&:hover': { 
                                  backgroundColor: `${colors.success.default}CC` 
                              },
                              borderRadius: '5px'
                          }} onClick={agregarColumna}>
          Agregar Columna
        </Button>
      </Box>
      <Box sx={{ width: "100%", maxWidth: "800px", height: 400 }}>
      <DataGrid
        rows={empleados}
        columns={columnas}
        processRowUpdate={handleEditCell}       
        pageSizeOptions={[5, 10]}
        
        sx={{
            backgroundColor: "white", // Fondo blanco
            "& .MuiDataGrid-cell": {
              backgroundColor: "white", // Asegura que las celdas también sean blancas
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5", // Opcional: cambia el fondo de los encabezados
            },
          }}
      />
    </Box>
</Box>

</Paper></Grid></Grid>
        </PageTransition>
     
    )
  }

export default Empleados