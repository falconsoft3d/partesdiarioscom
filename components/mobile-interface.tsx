'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function MobileInterface() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm mx-4">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">Partes Diarios</h1>
          <p className="text-center text-lg text-gray-600 mb-4">
            Te ayudamos en la gestión de proyectos
          </p>
          <div className="space-y-4">
            <Button 
              className="w-full h-16 text-lg justify-start px-4 bg-black text-white hover:bg-gray-800"
            >
              <Settings className="w-6 h-6 mr-4" />
              Configuración
            </Button>
            <Button 
              className="w-full h-16 text-lg justify-start px-4" 
              variant="outline"
            >
              <FileText className="w-6 h-6 mr-4" />
              Documentación
            </Button>
            <Link 
              href="https://partesdiarios.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-full h-12 px-4 text-lg text-blue-600 hover:text-blue-800 hover:underline"
            >
              Visitar partesdiarios.com
              <ExternalLink className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}