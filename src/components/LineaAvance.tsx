'use client'
import { Autocomplete, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import PageTransition from "./ui/pageTransition"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const listaPresupuesto = [
    {
      id: 'pres1',
      nombre: 'Pres1',
      pcps: [
        {
          id: 'pcp1',
          nombre: 'PCP 1',
          items: [
            { id: 'item1', nombre: 'Item 1' },
            { id: 'item2', nombre: 'Item 2' },
          ],
        },
        {
          id: 'pcp2',
          nombre: 'PCP 2',
          items: [
            { id: 'item3', nombre: 'Item 3' },
          ],
        },
      ],
    },
    {
      id: 'pres2',
      nombre: 'Pres2',
      pcps: [
        {
          id: 'pcp3',
          nombre: 'PCP 3',
          items: [],
        },
      ],
    },
  ];

  type RowItem = {
    id: string;
    nombre: string;
    tipo: 'PCP' | 'Item';
    nivel: number;
  };
  type Item = {
    id: string | number;
    nombre: string;
  };
  
  type PCP = {
    id: string | number;
    nombre: string;
    items: Item[];
  };
  
  type Presupuesto = {
    id: string | number;
    nombre: string;
    pcps: PCP[];
  };
  
  
const LineaAvance = () => {
    const router = useRouter();
    const [presupuesto, setPresupuesto] = useState<string | null>(null);
    const [rows, setRows] = useState<RowItem[]>([]);

    const handleChangePresupuesto = (_event: React.SyntheticEvent, val: string | null) => {
        setPresupuesto(val);
        const seleccionado = listaPresupuesto.find(p => p.nombre === val);
        if (seleccionado) {
          const data = mapToFlatRows(seleccionado);
          setRows(data);
        } else {
          setRows([]);
        }
      };
      
      
      const mapToFlatRows = (presupuesto: Presupuesto | null): RowItem[] => {
        if (!presupuesto) return [];
      
        const rows: RowItem[] = [];
      
        presupuesto.pcps.forEach((pcp) => {
          rows.push({
            id: `pcp-${pcp.id}`,
            nombre: pcp.nombre,
            tipo: 'PCP',
            nivel: 0,
          });
      
          pcp.items.forEach((item) => {
            rows.push({
              id: `item-${item.id}`,
              nombre: item.nombre,
              tipo: 'Item',
              nivel: 1,
            });
          });
        });
      
        return rows;
      };
      

      const columns: GridColDef[] = [
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 300,
          renderCell: (params) => (
            <span style={{ paddingLeft: params.row.nivel * 20 }}>
              {params.row.nivel === 1 ? '📎 ' : ''}
              {params.value}
            </span>
          ),
        },
        { field: 'tipo', headerName: 'Tipo', width: 100 },
      ];
      
    return (
        <PageTransition>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '150vh', p: 2 }}>
          <Grid size ={{xs:12, sm:8 ,md:6, lg:4}}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 4, textAlign: 'center', backgroundColor: '#714B67' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#f7f0f5', alignItems: 'center', width: "100%" }}>
                <Button
                  startIcon={<i className="ri-arrow-left-circle-line"></i>}
                  sx={{ mb: 1, color: '#f7f0f5' }}
                  onClick={() => router.push('/partes')}
                  fullWidth
                >
                  Volver
                </Button>
                <Typography variant="h6" sx={{
                  color: 'primary.contrastText',
                  mb: 2,
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  Linea de Avance
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
              <Autocomplete
  options={listaPresupuesto.map(p => p.nombre)}
  value={presupuesto}
  onChange={handleChangePresupuesto}
  renderInput={(params) => <TextField {...params} placeholder="Presupuesto" />}
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
/>

{rows.length > 0 && (
  <Box sx={{ height: 400, mt: 2, backgroundColor: 'white', borderRadius: 2 }}>
    <DataGrid
      rows={rows}
      columns={columns}
      
      getRowClassName={(params) =>
        params.row.nivel === 0 ? 'row-pcp' : 'row-item'
      }

      sx={{
        '& .row-pcp': {
          backgroundColor: '#f5f5f5',
          fontWeight: 'bold',
        },
        '& .row-item': {
          backgroundColor: '#ffffff',
        },
      }}
    />
  </Box>
)}


  
</Box>
              </Paper>
          </Grid>
        </Grid>
        </PageTransition>
    )
}

export default LineaAvance