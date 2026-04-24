'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    lastLogin: new Date().toLocaleDateString(),
    accountStatus: 'Activo',
    memberSince: new Date().toLocaleDateString(),
  });
  const { t } = useLanguage();
  const tp = t.dashboardPage;

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getRoleBasedContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{tp.usuariosTotales}</CardTitle>
                <CardDescription>{tp.gestionUsuarios}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-sm text-gray-600">{tp.mas12EsteMes}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{tp.ingresos}</CardTitle>
                <CardDescription>{tp.ingresosMensuales}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$45,678</p>
                <p className="text-sm text-green-600">{tp.mas23EsteMes}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{tp.diagnosticos}</CardTitle>
                <CardDescription>{tp.totalRealizados}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">567</p>
                <p className="text-sm text-gray-600">{tp.estaSemana89}</p>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'consultant':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{tp.misClientes}</CardTitle>
                <CardDescription>{tp.clientesActivos}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">28</p>
                <p className="text-sm text-gray-600">{tp.nuevosEsteMes3}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{tp.diagnosticosRealizados}</CardTitle>
                <CardDescription>{tp.esteMes}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">45</p>
                <p className="text-sm text-green-600">{tp.mas15VsMesAnterior}</p>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'client':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{tp.miSuscripcion}</CardTitle>
                <CardDescription>{tp.planActual}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{tp.planPremium}</p>
                <p className="text-sm text-gray-600">{tp.renovacion}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{tp.diagnosticosDisponibles}</CardTitle>
                <CardDescription>{tp.esteMes}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3/5</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{tp.bienvenidoImpulsaLab}</CardTitle>
              <CardDescription>{tp.cuentaBasica}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {tp.actualizaCuenta}
              </p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                {tp.verPlanes}
              </button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {tp.bienvenido} {user?.email?.split('@')[0]}! 👋
        </h1>
        <p className="text-purple-100">
          {tp.panelControl}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>{tp.ultimoAcceso}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{stats.lastLogin}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>{tp.estadoCuenta}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-green-600">{stats.accountStatus}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>{tp.miembroDesde}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{stats.memberSince}</p>
          </CardContent>
        </Card>
      </div>

      {/* Role-based content */}
      {getRoleBasedContent()}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{tp.accionesRapidas}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <span className="text-2xl mb-2">📊</span>
            <p className="text-sm font-medium">{tp.nuevoDiagnostico}</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <span className="text-2xl mb-2">📈</span>
            <p className="text-sm font-medium">{tp.verReportes}</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <span className="text-2xl mb-2">⚙️</span>
            <p className="text-sm font-medium">{tp.configuracion}</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <span className="text-2xl mb-2">💬</span>
            <p className="text-sm font-medium">{tp.soporte}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
