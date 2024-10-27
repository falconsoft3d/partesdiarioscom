"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Función simple de encriptación (solo para demostración)
const encryptPassword = (password: string) => {
  return btoa(password) // Esto es una codificación en Base64, no una encriptación segura
}

export function Configuracion() {
  const [url, setUrl] = useState("")
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Cargar datos guardados al iniciar el componente
    const savedUrl = localStorage.getItem("partesDiarios_url")
    const savedUsuario = localStorage.getItem("partesDiarios_usuario")
    if (savedUrl) setUrl(savedUrl)
    if (savedUsuario) setUsuario(savedUsuario)
    // No cargamos la contraseña por seguridad
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Guardar en localStorage
    localStorage.setItem("partesDiarios_url", url)
    localStorage.setItem("partesDiarios_usuario", usuario)
    localStorage.setItem("partesDiarios_contrasena", encryptPassword(contrasena))

    // Mostrar mensaje de configuración guardada
    toast({
      title: "Configuración guardada",
      description: "Tus datos han sido guardados correctamente.",
      duration: 3000, // La notificación se mostrará durante 3 segundos
    })

    console.log("Configuración guardada en localStorage")
  }

  const handleVolver = () => {
    router.push('/') // Navega a la página inicial
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button
            variant="ghost"
            className="mb-2"
            onClick={handleVolver}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <CardTitle className="text-2xl font-bold text-center">Configuración</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://ejemplo.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                type="text"
                placeholder="Tu nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input
                id="contrasena"
                type="password"
                placeholder="Tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Save className="mr-2 h-4 w-4" /> Guardar Configuración
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}