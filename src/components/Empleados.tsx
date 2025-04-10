/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import PageTransition from './ui/pageTransition'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowModel } from "@mui/x-data-grid";

import {  Autocomplete, Box, Button, Grid, IconButton, Menu, MenuItem, Paper, TextField, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import { Empleado, EmpleadoConfig } from '@/util/types';
import { colors } from '@/util/colorTheme';
import { useAuth } from '@/context/AuthContext';
import Swal from 'sweetalert2';
// Nueva interfaz para la configuración
interface Configuracion {
  id: number;
  cod_odt: string;
  cod_psp: string;
  cod_presupuesto: string;
  denominacion: string;
}

// Supongamos estas listas (reemplazá con tus datos reales)
const listaODT = ['ODT1', 'ODT2', 'ODT3'];
const listaPCP = ['PCP1', 'PCP2'];
const listaPresupuesto = ['Pres1', 'Pres2'];

 const Empleados = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [configuraciones, setConfiguraciones] = useState<Configuracion[]>([]);
    const [empleadoConfigs, setEmpleadoConfigs] = useState<EmpleadoConfig[]>([]);
    const [odt, setOdt] = useState<string | null>(null);
    const [pcp, setPcp] = useState<string | null>(null);
    const [presupuesto, setPresupuesto] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);

// Este hook indica si el botón debe estar activo
const botonActivo = useMemo(() => odt && pcp && presupuesto, [odt, pcp, presupuesto]);
console.log(empleadoConfigs);

   
    // Estado de empleados
  const [empleados, setEmpleados] = useState<Empleado[]>([
    { id: 1, nombre: "Juan Pérez", edad: 30, puesto: "Desarrollador" },
    { id: 2, nombre: "María López", edad: 28, puesto: "Diseñadora" },
  ]);

 // Función para guardar en la base de datos
 const saveToDatabase = async (empleado_id: number, configuracion_id: number, valor: string) => {
  //await guardarEmpleadoConfig({empleado_id,configuracion_id,valor});
  console.log(empleado_id,configuracion_id,valor);
  
};

// Manejar actualización de celdas
const handleEditCell = async (updatedRow: GridRowModel) => {
  // Obtener la configuración modificada
  const changedFields = Object.keys(updatedRow)
      .filter(key => key !== 'id' && key !== 'nombre' && key !== 'edad' && key !== 'puesto');
  
  for (const field of changedFields) {
      const config = configuraciones.find(c => c.denominacion === field);
      if (!config) continue;
      
      await saveToDatabase(updatedRow.id, config.id, updatedRow[field]);
  }

  // Actualizar estado local
  setEmpleados(prev => 
      prev.map(emp => 
          emp.id === updatedRow.id ? { ...emp, ...updatedRow } : emp
      )
  );
  
  return updatedRow;
};

  // Generar tooltip para el header
  const getHeaderTooltip = (config: Configuracion) => {
    return `${config.cod_odt} | ${config.cod_psp} | ${config.cod_presupuesto}`;
};

// Generar columnas dinámicas basadas en configuraciones
const dynamicColumns: GridColDef[] = configuraciones.map(config => ({
    field: config.denominacion,
    headerName: config.denominacion,
    width: 100,
    editable: true,
    renderHeader: () => (
        <Tooltip title={getHeaderTooltip(config)} arrow>
            <span>{config.denominacion}</span>
        </Tooltip>
    )
}));

// Columnas estáticas iniciales
const staticColumns: GridColDef[] = [
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <IconButton onClick={(e) => handleMenuClick(e, params.row)}>
        <i className='ri-more-fill' />
      </IconButton>
    ),
  },
    { 
        field: "nombre", 
        headerName: "Empleado", 
        width: 150, 
        editable: true,
    renderEditCell: (params) => {
      return (
        <Autocomplete
          options={empleados}
          fullWidth
          getOptionLabel={(option) => option.nombre}
          value={empleados.find(opt => opt.id === params.value) || null}
          onChange={(e, newValue) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: newValue?.nombre || null
            });
          }}
          renderInput={(paramsInput) => <TextField {...paramsInput} variant="standard" />}
        />
      );
    },
       }
];

const [columnas, setColumnas] = useState<GridColDef[]>([...staticColumns, ...dynamicColumns]);


const agregarColumna = () => {
  // Filtrar columnas con field numérico
  const columnasNumericas = columnas
    .map(col => Number(col.field))
    .filter(num => !isNaN(num));

  // Obtener el valor máximo o 0 si no hay ninguno
  const max = columnasNumericas.length > 0 ? Math.max(...columnasNumericas) : 0;
console.log(max);

  const num = max + 1;

  const nuevaCol: GridColDef = {
    field: num.toString(),
    headerName: num.toString(),
    width: 50,
    editable: true,
    renderHeader: () => (
      <Tooltip title={`${odt} | ${pcp} | ${presupuesto}`}>
        <span>{num.toString()}</span>
      </Tooltip>
    ),
  };


  setColumnas(prev => [...prev, nuevaCol]);
};

const col: GridColDef[] = [...staticColumns, ...dynamicColumns];


const handleMenuClick = (event: React.MouseEvent<HTMLElement>, empleado: Empleado) => {
  setAnchorEl(event.currentTarget);
  setSelectedEmpleado(empleado)
console.log(empleado);

};
const handleMenuClose = () => {
  setAnchorEl(null);
  //setSelectedUser(null);
};

const empleadoDelete = async (selectedUser: Empleado | null) => {
  if (selectedUser?.id) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el registro? ${selectedUser.id} ${selectedUser.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      // Simula eliminación exitosa (puedes usar fetch/axios si es una API real)
      // const response = await remove<ApiResponse>(`/api/empleados/${selectedUser.id}`);
      const response = { statusCode: 200, message: 'Empleado eliminado correctamente' };

      if (response.statusCode === 200) {
        // Eliminar del estado
        setEmpleados(prev => prev.filter(emp => emp.id !== selectedUser.id));

        Swal.fire('Información!', response.message, 'success');
      } else {
        Swal.fire('Error!', `Error al eliminar el empleado ${selectedUser.nombre}`, 'error');
      }
    }
  }
};


const agregarFila = ()=>{
  const nuevoEmpleado = {
    id: Date.now() * -1, // ID temporal único (usamos negativo para diferenciar)
    nombre: '', // Valor inicial requerido
    edad: 0, // Valor inicial requerido
    puesto: '', // Valor inicial requerido
  };
  setEmpleados((prev) => [...prev, nuevoEmpleado]);
}

useEffect(() => {
        
  // if (!isAuthenticated) {
  //         router.push('/config')
  //     }


  const loadData = async () => {
    try {
        // Cargar configuraciones
        const configResponse = await fetch('/api/configuracion');
        const configData = await configResponse.json();
        
        if (configData.success) {
            setConfiguraciones(configData.data);
            
            // Cargar relaciones empleado-config
            const empleadoConfigResponse = await fetch('/api/empleado-config');
            const empleadoConfigData = await empleadoConfigResponse.json();
            
            if (empleadoConfigData.success) {
                setEmpleadoConfigs(empleadoConfigData.data);
                
                // Mapear valores a empleados
                setEmpleados(prev => prev.map(emp => ({
                    ...emp,
                    ...configData.data.reduce((acc: { [key: string]: string }, cfg: Configuracion) => {
                        const configValue = empleadoConfigData.data.find(
                            (ec: EmpleadoConfig) => 
                                ec.empleado_id === emp.id && 
                                ec.configuracion_id === cfg.id
                        );
                        acc[cfg.denominacion] = configValue?.valor || '';
                        return acc;
                    }, {})
                })));
            }
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
};
loadData();

setColumnas(col);
}, [col,setColumnas])
   

    return (
        <PageTransition>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '150vh', p: 2}}>
            <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div" sx={{ position: 'relative' }}>
               
                <Paper elevation={6} sx={{ p: 3, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1,backgroundColor: '#714B67' }}>
                {/* <CerrarSesion/> */}
                    {/* Ícono centrado arriba */}
                    <Box  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',color: '#f7f0f5' ,alignItems: 'center',width: "100%" }}>
                    <Button
                        startIcon={<i className="ri-arrow-left-circle-line"></i>}
                        sx={{ mb: 1, color: '#f7f0f5' }}
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
<Box sx={{ width: "100%",mb: 8 }}>
<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
<Autocomplete
    options={listaPresupuesto}
    value={presupuesto}
    sx={{
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
    onChange={(e, val) => setPresupuesto(val)}
    renderInput={(params) => <TextField {...params} placeholder="Presupuesto" />}
  />
  <Autocomplete
    options={listaODT}
    value={odt}
    sx={{
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
    onChange={(e, val) => setOdt(val)}
    renderInput={(params) => <TextField {...params} placeholder="ODT" />}
  />
  <Autocomplete
    options={listaPCP}
    value={pcp}
    sx={{
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
    onChange={(e, val) => setPcp(val)}
    renderInput={(params) => <TextField {...params} placeholder="PCP" />}
  />
  
  <Button
    variant="contained"
    startIcon={<i className="ri-add-large-line"></i>}
    disabled={!botonActivo}
    sx={{
      backgroundColor: colors.success.default,
      '&:hover': {
        backgroundColor: `${colors.success.default}CC`
      },
      borderRadius: '5px'
    }}
    onClick={agregarColumna}
  >
    Agregar Columna
  </Button>
</Box>
{/* Menú de acciones */}
<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
           
            <MenuItem
              onClick={() => empleadoDelete(selectedEmpleado)}
              sx={{ color: 'red' }}
            >
              <i className="ri-delete-bin-line" /> Eliminar
            </MenuItem>
            
          </Menu>
      <Box sx={{ width: "100%", maxWidth: "800px" }}>
     
      <DataGrid
      // autoHeight
      // loading={loading}
        rows={empleados}
        columns={columnas}
        processRowUpdate={handleEditCell}
        onProcessRowUpdateError={(error) => console.error(error)}    
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
    <Button
    variant="contained"
    startIcon={<i className="ri-add-large-line"></i>}
   
    sx={{
      mt:3,
      width:'100%',
      backgroundColor: colors.success.default,
      '&:hover': {
        backgroundColor: `${colors.success.default}CC`
      },
      borderRadius: '5px'
    }}
    onClick={agregarFila}
  >
    Agregar Empleado
  </Button>
</Box>

</Paper></Grid></Grid>
        </PageTransition>
     
    )
  }

export default Empleados