'use client'
import { Autocomplete, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import PageTransition from "./ui/pageTransition"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import   { Column,DataGrid, RowsChangeData } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import  {CellClickArgs} from "react-data-grid";
import { useAuth } from "@/context/AuthContext";
import CerrarSesion from "./CerrarSesion";

const listaPresupuesto = [
  {
    id: 'pres1',
    nombre: 'Pres1',
    pcps: [
      {
        id: 'pcp1',
        nombre: 'PCP 1',
        // desglose: 'Desglose 1',
        // odt: 'ODT-101',
        // estatus: 'En progreso',
        // cantidad: 5,
        // hGanadas: 20,
        // hGastadas: 10,
        items: [
          { id: 'item1', nombre: 'Item 1', descripcion: 'D1', causa: 'Lluvias',  hGanadas: 8, hGastadas: 4 },
          { id: 'item2', nombre: 'Item 2', descripcion: 'D2', causa: 'Falta de materiales',  hGanadas: 5, hGastadas: 5 },
        ],
      },
      {
        id: 'pcp2',
        nombre: 'PCP 2',
        // desglose: 'Desglose 2',
        // odt: 'ODT-102',
        // estatus: 'Completado',
        // cantidad: 3,
        // hGanadas: 12,
        // hGastadas: 12,
        items: [
          { id: 'item3', nombre: 'Item 3', descripcion: 'D3', causa: 'Alerta roja', hGanadas: 7, hGastadas: 3 },
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
        // desglose: 'Desglose 3',
        // odt: 'ODT-103',
        // estatus: 'Pendiente',
        // cantidad: 0,
        // hGanadas: 0,
        // hGastadas: 0,
        items: [],
      },
    ],
  },
]; 

const causas = [
  { value: 'Lluvias', label: 'Lluvias' },
  { value: 'Falta de materiales', label: 'Falta de materiales' },
  { value: 'Alerta roja', label: 'Alerta roja' },
  { value: 'Falta de seguridad', label: 'Falta de seguridad' },
  { value: 'Ordenes del cliente', label: 'Ordenes del cliente' },
  { value: 'Otros', label: 'Otros' },
];

type Item = {
  id: string | number;
  nombre: string;
  descripcion: string;
  causa: string;  
  hGanadas: number;
  hGastadas: number;
};

type PCP = {
  id: string | number;
  nombre: string;  
  items: Item[];
};

type RowItem = {
  id: string;
  nombre: string;
  tipo: 'PCP' | 'Item';
  nivel: number;
  descripcion?: string;
  causa?: string;  
  hGanadas?: number;
  hGastadas?: number;
  parentId?: string | null;
  children?: RowItem[];
};

type Presupuesto = {
  id: string | number;
  nombre: string;
  pcps: PCP[];
};

const HorasPerdidas = () => {
  const router = useRouter();
  const [presupuesto, setPresupuesto] = useState<string | null>(null);
  const [rows, setRows] = useState<RowItem[]>([]);
  const [expandedGroupIds, setExpandedGroupIds] = useState<Set<string>>(() => new Set());
  const [listasPresupuesto, setListasPresupuesto] = useState<Presupuesto[]>(listaPresupuesto);
  const { isAuthenticated } = useAuth();

 
  
  const selectedPresupuesto = useMemo(() => {
    return listasPresupuesto.find(p => p.nombre === presupuesto) || null;
  }, [listasPresupuesto, presupuesto]);
  const handleChangePresupuesto = (_event: React.SyntheticEvent, val: string | null) => {
    setPresupuesto(val);
    
  };
  
  
  const mapToFlatRows = (presupuesto: Presupuesto): RowItem[] => {
    const rows: RowItem[] = [];

    presupuesto.pcps.forEach((pcp) => {
      const pcpRow: RowItem = {
        id: `pcp-${pcp.id}`,
        nombre: pcp.nombre,
        tipo: 'PCP',
        nivel: 0,       
        parentId: null
      };
      rows.push(pcpRow);

      pcp.items.forEach((item) => {
        rows.push({
          id: `item-${item.id}`,
          nombre: item.nombre,
          tipo: 'Item',
          nivel: 1,
          descripcion: item.descripcion,
          causa: item.causa,          
          hGanadas: item.hGanadas,
          hGastadas: item.hGastadas,
          parentId: pcpRow.id
        });
      });
    });

    return rows;
  };

  const createTree = (flatRows: RowItem[]): RowItem[] => {
    const tree: RowItem[] = [];
    const map = new Map<string, RowItem & { children?: RowItem[] }>();

    flatRows.forEach(item => {
      map.set(item.id, { ...item });
    });

    flatRows.forEach(item => {
      if (item.parentId) {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(map.get(item.id)!);
        }
      } else {
        tree.push(map.get(item.id)!);
      }
    });

    return tree;
  };

  const handleAutocompleteChange = (
    key: keyof RowItem,
    value: string | null,
    row: RowItem,
    onRowChange: (row: RowItem, enableDefault?: boolean) => void
  ) => {
    const updatedRow = { ...row, [key]: value || '' };
    console.log(updatedRow);
    
    onRowChange(updatedRow, true);
  };

  const actualizarCausaEnLista = (itemId: string, nuevaCausa: string) => {
    const nuevaLista = listasPresupuesto.map((presupuesto) => ({
      ...presupuesto,
      pcps: presupuesto.pcps.map((pcp) => ({
        ...pcp,
        items: pcp.items.map((item) =>
          item.id === itemId ? { ...item, causa: nuevaCausa } : item
        ),
      })),
    }));
  console.log(nuevaLista);  
    setListasPresupuesto(nuevaLista);
  };

  const actualizarCampoEnLista = <K extends keyof Item>(
    itemId: string,
    campo: K,
    nuevoValor: Item[K]
  ) => {
    const nuevaLista = listasPresupuesto.map((presupuesto) => ({
      ...presupuesto,
      pcps: presupuesto.pcps.map((pcp) => ({
        ...pcp,
        items: pcp.items.map((item) =>
          item.id === itemId ? { ...item, [campo]: nuevoValor } : item
        ),
      })),
    }));
  
    setListasPresupuesto(nuevaLista);
  };
  
  
  


  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedGroupIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedGroupIds(newExpanded);
  };

  const columns: Column<RowItem>[] = [
    {
      key: 'nombre',
      name: 'Elemento',
      width: 200,
      frozen: true, // Hace la columna fija
      renderCell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: row.nivel * 20 }}>
          {row.tipo === 'PCP' && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(row.id);
              }}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                marginRight: '8px',
                fontSize: '14px'
              }}
            >
              {expandedGroupIds.has(row.id) ? '▼' : '►'}
            </button>
          )}
          {row.tipo === 'Item' && '📎 '}
          {row.nombre}
        </div>
      )
    },   
    { key: 'descripcion', name: 'Descripción', width: 100 },    
    { 
       key: 'causa', name: 'Causa',
      width: 150,
      editable: true,
      renderEditCell: ({ row, onRowChange }) => (
        <div style={{ padding: '4px' }}>
          <Autocomplete
            freeSolo
            options={causas} // Opciones predefinidas
            value={row.causa}
            onChange={(_e, value) => {
              const stringValue = typeof value === 'string' ? value : value?.value ?? '';
              handleAutocompleteChange('causa', stringValue, row, onRowChange);
              actualizarCausaEnLista(row.id.replace('item-', ''), stringValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                style={{ width: '100%',height: '100%' }}
                size="small"
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            )}
          />
        </div>
      )
    },
    { key: 'hGanadas', name: 'Horas', width: 110 ,
      editable: row => row.tipo === 'Item',
      renderEditCell: ({ row, onRowChange }) => (
        <input
          type="number"
          value={row.hGanadas}
          onChange={e => {
            const nuevoValor = Number(e.target.value);
            onRowChange({ ...row, hGanadas: nuevoValor });
            actualizarCampoEnLista(row.id.replace('item-', ''), 'hGanadas', nuevoValor);
          }}
          style={{ width: '100%',height: '100%' }}
        />
      ) 
    },
    
  ] as Column<RowItem>[];

  const visibleRows = rows.flatMap(row => {
    const result = [row];
    if (row.tipo === 'PCP' && expandedGroupIds.has(row.id) && row.children) {
      result.push(...row.children);
    }
    return result;
  });

  const handleCellClick = (args: CellClickArgs<RowItem>) => {
    if (args.row.tipo === 'PCP') {
      toggleExpanded(args.row.id);
    }
  };

// Modifica la función handleRowsChange
const handleRowsChange = (newRows: RowItem[], data: RowsChangeData<RowItem, unknown>) => {
  setRows(prevRows => {
    const updatedRows = [...prevRows];
    data.indexes.forEach(index => {
      const newRow = newRows[index];
      const originalIndex = prevRows.findIndex(r => r.id === newRow.id);
      if (originalIndex !== -1) {
        updatedRows[originalIndex] = newRow;
      }
    });
    return updatedRows;
  });
};


useEffect(() => {
    
    if (!isAuthenticated) {
            router.push('/login')
        }
        if (selectedPresupuesto) {
          const flatData = mapToFlatRows(selectedPresupuesto);
          const treeData = createTree(flatData); // si tenés createTree para estructurarlo
          setRows(treeData);
        } else {
          setRows([]);
        }
   
  }, [selectedPresupuesto])


  return (
    <PageTransition>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '150vh', p: 2 }}>
        <Grid size ={{xs:12, sm:8 ,md:6, lg:4}}>
          <Paper elevation={6} sx={{ p: 3, borderRadius: 4, textAlign: 'center', backgroundColor: '#714B67' }}>
          <CerrarSesion/>
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
               Horas Perdidas
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
                  },
                  '& .MuiFormHelperText-root': {
                    color: 'white !important',
                    fontSize: '0.875rem'
                  },
                }}
              />

              <Box sx={{
                height: 400,
                mt: 2,
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: 'white'
              }}>
                <DataGrid
  columns={columns}
  rows={visibleRows}
  rowKeyGetter={row => row.id}
  className="rdg-light"
  style={{
    height: '100%',
    fontFamily: "'Poppins', sans-serif"
  }}
  headerRowHeight={40}
  rowHeight={40}
  onCellClick={handleCellClick}
  onRowsChange={handleRowsChange}
/>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageTransition>
  );
};

export default HorasPerdidas;