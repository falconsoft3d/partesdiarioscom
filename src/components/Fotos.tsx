
'use client'

import { Avatar, Box, Button, Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
import PageTransition from "./ui/pageTransition"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { colors } from "@/util/colorTheme";
import { styled } from '@mui/material/styles';
import { guardarFotos } from "@/app/api/fotos/services/fotosService";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import CerrarSesion from "./CerrarSesion";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    
  }));
const Fotos = () => {
  const router = useRouter();

  const [photos, setPhotos] = useState<{ preview: string; comment: string }[]>([]);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
      
      if (!isAuthenticated) {
              router.push('/login')
          }
     
    }, [])

 // Modifica el handleFileChange para agregar en lugar de reemplazar
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos: { preview: string; comment: string }[] = [];
  
    let count = 0;
  
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push({ preview: event.target.result as string, comment: "" });
          count++;
          if (count === files.length) {
            setPhotos(prev => [...prev, ...newPhotos]); // Agregar nuevas fotos a las existentes
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  // Función para reemplazar una foto específica
  const handleReplacePhoto = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPhotos(prev => 
          prev.map((photo, i) => 
            i === index ? { ...photo, preview: event.target!.result as string } : photo
          )
        );
      }
    };
    reader.readAsDataURL(file);
  };
  const handleCommentChange = (index: number, comment: string) => {
    setPhotos((prev) =>
      prev.map((photo, i) =>
        i === index ? { ...photo, comment } : photo
      )
    );
  };

  const handleUpload = async (index: number) => {
    const photo = photos[index];
  
    if (!photo.comment.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Observación requerida',
        text: 'Por favor, escribe una observación antes de subir la foto.',
      });
      return;
    }
  
    const result = await guardarFotos({
      foto: photo.preview,
      observacion: photo.comment,
      id_usuario: 1, // Cambiar por el id real
      createdDate: new Date(),
    });
  
    console.log(result);
  
    if (result.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '¡Foto subida!',
        text: result.message,
        showConfirmButton: false,
        timer: 3000,
      });
  
      // Opcional: eliminar la foto de la lista después de subirla
      setPhotos(prev => prev.filter((_, i) => i !== index));
    }
  };
  
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
                Fotos
              </Typography>
            </Box>

            <Box >
              <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <Avatar
                  alt="Remy Sharp"
                  src="/images/noimage.jpeg"
                  sx={{ width: 56, height: 56 }}
                />
              </Box>

              <input
    accept="image/*"
    type="file"
    id="photo-upload"
    style={{ display: 'none' }}
    onChange={handleFileChange}
    multiple // Si quieres permitir selección múltiple
  />
              <Box textAlign="center" mb={2}>
                <Button
                  startIcon={<i className="ri-image-add-line"></i>}
                  variant="outlined"
                  sx={{
                    color: '#f7f0f5',
                    backgroundColor: colors.success.default,
                    '&:hover': {
                      backgroundColor: `${colors.success.default}CC`
                    },
                    borderRadius: '5px'
                  }}
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  Seleccionar Fotos
                </Button>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
              <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
  {photos.map((photo, index) => (
    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} key={index}
    component="div">
         <Item sx={{
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
         
        }}>
      <input
        accept="image/*"
        type="file"
        id={`replace-photo-${index}`}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReplacePhoto(index, file);
        }}
      />
        <Box
          component="img"
          src={photo.preview}
          alt={`preview-${index}`}
          sx={{
            height: 208,
            width: '100%',
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />

        <TextField
          fullWidth
          
          placeholder="Observación"
          value={photo.comment}
          onChange={(e) => handleCommentChange(index, e.target.value)}
          sx={{ mt: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}
        />

{photos.length > 0 && ( <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
    <IconButton 
              onClick={() => document.getElementById(`replace-photo-${index}`)?.click()}
              title="Cambiar Fotos"
              sx={{
                color: '#f7f0f5',
                backgroundColor: colors.secondary.default,
                '&:hover': {
                  backgroundColor: `${colors.secondary.default}CC`
                },
                borderRadius: '5px',
                padding: '8px'
              }}
            >
              <i className="ri-image-edit-line" />
            </IconButton>
            <IconButton 
            title="Subir Fotos"
            onClick={() => handleUpload(index)}
              sx={{
                color: '#f7f0f5',
                backgroundColor: colors.success.default,
                '&:hover': {
                  backgroundColor: `${colors.success.default}CC`
                },
                borderRadius: '5px',
                padding: '8px'
              }}
            >
              <i className="ri-gallery-upload-line" />
            </IconButton>
          </Box>)}
      </Item>
    </Grid>
  ))}
</Grid></Box>


              {/* {photos.length > 0 && (
                <Box textAlign="center" mt={3}>
                  <Button
                    startIcon={<i className="ri-gallery-upload-line"></i>}
                    variant="contained"
                    sx={{
                      color: '#f7f0f5',
                      backgroundColor: colors.success.default,
                      '&:hover': {
                        backgroundColor: `${colors.success.default}CC`
                      },
                      borderRadius: '5px'
                    }}
                    onClick={handleUpload}
                  >
                    Subir Fotos
                  </Button>
                </Box>
              )} */}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageTransition>
  )
}

export default Fotos;
