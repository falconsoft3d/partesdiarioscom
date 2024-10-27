"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Función simple de encriptación (solo para demostración)
const encryptPassword = (password: string) => {
  return btoa(password) // Esto es una codificación en Base64, no una encriptación segura
}

export default function Pagedocumentacion() {
  const router = useRouter()



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
          <CardTitle className="text-2xl font-bold text-center">Documentación</CardTitle>
        </CardHeader>
        <CardContent>
            <p><strong>Documentación</strong></p>
            <p>1- Configure un servidor de <strong>Odoo ERP</strong>.</p>
            <p>2- Carge los partes que tiene que hacer.</p>
            <p>3- Envie los partes llenando el avance.</p>
            <br />
            <p><strong>A tener en cuenta</strong></p>
            <p>Para cargar los partes nuevos tienes que tener terminado el parte anterior.</p>
            <br />
            <p><strong>Versión</strong></p>
            <p>1.0</p>
            <br />
            <p><strong>Contacto</strong></p>
            <p>soporte@partesdiarios.com</p>
            <p>+34 662 47 06 45</p>
        </CardContent>
      </Card>
    </div>
  )
}