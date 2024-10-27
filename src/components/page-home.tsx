import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, ExternalLink, ArrowDown, ArrowUp } from "lucide-react"
import Link from "next/link"

export default function Pagehome() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm mx-2">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">PartesDiarios.com</h1>
          <p className="text-center text-lg text-gray-600 mb-2">
            Sistema de Gestión de Partes V 1.0
          </p>
          <div className="space-y-4">
            <Button 
              className="w-full h-16 text-lg justify-start px-4  bg-black text-white hover:bg-gray-300 mt-4" 
              variant="outline">
               <ArrowDown className="w-6 h-6 mr-4" />
              Descargar Parte Diario
            </Button>

            <Button 
              className="w-full h-16 text-lg justify-start px-4  bg-black text-white hover:bg-gray-300 mt-4"
              variant="outline">
               <ArrowUp className="w-6 h-6 mr-4" />
              Subir Parte Diario
            </Button>
            
            
            
            <Link href="/config" passHref>
              <Button 
                className="w-full h-16 text-lg justify-start px-4  bg-blue-800 text-white hover:bg-blue-600 mt-4"
                asChild>
                <span>
                  <Settings className="w-6 h-6 mr-4" />
                  Configuración
                </span>
              </Button>
            </Link>
            

            
            <Link 
              href="https://partesdiarios.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-full h-12 px-4 text-lg text-blue-600 hover:text-blue-800 hover:underline"
            >
              soporte@bim20.com
              <ExternalLink className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}