
'use client'
import {
  Avatar, Box, Button, Container, Grid, Paper,
  TextField, Typography
} from "@mui/material";
import PageTransition from "./ui/pageTransition";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { guardarComentarios } from "@/app/api/comentarios/services/comentariosService";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import CerrarSesion from "./CerrarSesion";

const Comentarios = () => {
  const router = useRouter();

  const [comentario, setComentario] = useState("Mihai Viteazul, also known as Michael the Brave, was a Romanian prince who ruled in the late 16th century. He is celebrated for his efforts to unite the three historical provinces of Wallachia, Transylvania, and Moldavia into a single country.");
  const [comentarioUsuario, setComentarioUsuario] = useState("");
  const { isAuthenticated } = useAuth();
  useEffect(() => {
      
      if (!isAuthenticated) {
              router.push('/login')
          }
     
    }, [])


  const addComentarios = async () => {
    const nuevoTexto = `Comentario usuario jefe de Brigada: ${comentarioUsuario}`;
    const comentarioFinal = `Comentario usuario Administrador: ${comentario}\n${nuevoTexto}`;

    setComentario(comentarioFinal); // actualiza visualmente el componente

    const result = await guardarComentarios({
      comentario: comentarioFinal,
      id_usuario: 1, // cambiá esto por el id del usuario real
      createdDate: new Date(),
    });
if (result.status === 200) {
  console.log(result);
  Swal.fire({
    icon: 'success',
    title: '!Creado!',
    text: result.message,
    showConfirmButton: false,
    timer: 3000,
});
}

    setComentarioUsuario(""); // limpia el input
  }

  return (
    <PageTransition>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '150vh', p: 2 }}>
        <Grid size ={{xs:12, sm:8 ,md:6, lg:4}} component="div" sx={{ position: 'relative' }}>
          <Paper elevation={6} sx={{ p: 3, borderRadius: 4, textAlign: 'center', position: 'relative', zIndex: 1, backgroundColor: '#714B67' }}>
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
                Comentarios
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: 'zinc.950',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              
              }}
            >
              <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

                  {/* Entrada usuario */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'white', color: 'black', width: 60, height: 60 }}>
                      <i className="ri-user-line" />
                    </Avatar>
                    <Paper
                      elevation={3}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '8px',
                        backdropFilter: 'blur(10px)',
                        height: '100px',
                      }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={comentarioUsuario}
                        onChange={(e) => setComentarioUsuario(e.target.value)}
                        placeholder="Escribe tu comentario aquí"
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
                      <Box sx={{ p: 1.5, cursor: 'pointer', height: '100%',backgroundColor: '#38866C',borderRadius: '8px',display: 'flex',alignItems: 'center',justifyContent: 'center' }}>
                      <i title="Enviar comentario" className="ri-send-plane-fill" onClick={addComentarios}></i>
                        </Box>     
                     
                    </Paper>
                  </Box>

                  {/* Respuesta - editable */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'transparent',
                        border: '1px solid #27272a',
                        color: 'white',
                        width: 60, height: 60
                      }}
                    >
                      <i className="ri-user-line" />
                    </Avatar>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        bgcolor: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        fontSize: '18px',
                        width: '100%'
                      }}
                    >
                      <Typography paragraph><strong>Administrador</strong></Typography>
                      
                      
                        <Typography
                          paragraph
                          className="text-justify"
                          sx={{ cursor: 'pointer' }}
                                                 >
                          {comentario}
                        </Typography>
                    
                    </Paper>
                  </Box>

                </Box>
              </Container>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageTransition>
  );
};

export default Comentarios;
