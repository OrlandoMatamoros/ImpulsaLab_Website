'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  MoreHorizontal,
  Shield,
  UserCheck,
  UserX,
  Trash2,
  Edit,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface User {
  id: string;
  email: string;
  displayName?: string;
  name?: string;
  role?: string;
  phoneNumber?: string;
  phone?: string;
  createdAt?: any;
  lastLogin?: any;
  status?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState('');
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const router = useRouter();
  const { t } = useLanguage();
  const tp = t.adminUsersPage;

  useEffect(() => {
    // Verificar autenticación y rol admin
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.role !== 'admin') {
        router.push('/dashboard');
        return;
      }

      setAuthorized(true);
      await loadUsers();
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    // Aplicar filtros
    let filtered = [...users];
    
    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber?.includes(searchTerm) ||
        user.phone?.includes(searchTerm)
      );
    }
    
    // Filtro por rol
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset a primera página cuando se filtra
  }, [searchTerm, roleFilter, users]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error(tp.errorCargarUsuarios);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async () => {
    if (!selectedUser || !newRole) return;
    
    try {
      const userRef = doc(db, 'users', selectedUser.id);
      await updateDoc(userRef, {
        role: newRole,
        updatedAt: Timestamp.now()
      });
      
      toast.success(tp.rolActualizado + ' ' + newRole);
      setEditDialogOpen(false);
      await loadUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error(tp.errorActualizarRol);
    }
  };

  const handleToggleStatus = async (user: User) => {
    try {
      const newStatus = user.status === 'active' ? 'suspended' : 'active';
      const userRef = doc(db, 'users', user.id);
      
      await updateDoc(userRef, {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      toast.success(tp.usuario + ' ' + (newStatus === 'active' ? tp.activado : tp.suspendido));
      await loadUsers();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error(tp.errorCambiarEstado);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      // Soft delete - marcar como eliminado
      const userRef = doc(db, 'users', selectedUser.id);
      await updateDoc(userRef, {
        status: 'deleted',
        deletedAt: Timestamp.now()
      });
      
      toast.success(tp.usuarioEliminado);
      setDeleteDialogOpen(false);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(tp.errorEliminarUsuario);
    }
  };

  // Cálculo de paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getRoleBadgeVariant = (role?: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'consultant': return 'secondary';
      case 'premium': return 'default';
      default: return 'outline';
    }
  };

  const formatDate = (date: any) => {
    if (!date) return '-';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'dd MMM yyyy', { locale: es });
  };

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg">{tp.accesoDenegado}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{tp.gestionUsuarios}</h1>
          <p className="text-muted-foreground">
            {tp.administraUsuarios}
          </p>
        </div>
        <Button onClick={loadUsers} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {tp.actualizar}
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{tp.totalUsuarios}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{tp.usuariosAdmin}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.role === 'admin').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{tp.consultores}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.role === 'consultant').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{tp.usuariosPublicos}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {users.filter(u => !u.role || u.role === 'public' || u.role === 'free').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>{tp.filtros}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={tp.buscarPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={tp.filtrarPorRol} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tp.todosLosRoles}</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="consultant">{tp.consultor}</SelectItem>
                <SelectItem value="public">{tp.publico}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de usuarios */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tp.email}</TableHead>
                <TableHead>{tp.nombre}</TableHead>
                <TableHead>{tp.rol}</TableHead>
                <TableHead>{tp.telefono}</TableHead>
                <TableHead>{tp.fechaRegistro}</TableHead>
                <TableHead>{tp.estadoLabel}</TableHead>
                <TableHead className="text-right">{tp.accionesLabel}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : currentUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    {tp.noSeEncontraronUsuarios}
                  </TableCell>
                </TableRow>
              ) : (
                currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.displayName || user.name || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role || 'public'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.phoneNumber || user.phone || '-'}</TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      {user.status === 'suspended' ? (
                        <Badge variant="outline">{tp.suspendidoBadge}</Badge>
                      ) : user.status === 'deleted' ? (
                        <Badge variant="outline">{tp.eliminadoBadge}</Badge>
                      ) : (
                        <Badge variant="secondary">{tp.activoBadge}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">{tp.abrirMenu}</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{tp.accionesLabel}</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setNewRole(user.role || 'public');
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            {tp.cambiarRol}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(user)}
                          >
                            {user.status === 'suspended' ? (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                {tp.activar}
                              </>
                            ) : (
                              <>
                                <UserX className="mr-2 h-4 w-4" />
                                {tp.suspender}
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedUser(user);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {tp.eliminar}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {tp.mostrando} {startIndex + 1} {tp.a} {Math.min(endIndex, filteredUsers.length)} {tp.de} {filteredUsers.length} {tp.usuariosLabel}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              {tp.anterior}
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              {tp.siguiente}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Dialog para cambiar rol */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tp.cambiarRolUsuario}</DialogTitle>
            <DialogDescription>
              {tp.cambiandoRolPara} {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={newRole} onValueChange={setNewRole}>
              <SelectTrigger>
                <SelectValue placeholder={tp.seleccionarRol} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="consultant">{tp.consultor}</SelectItem>
                <SelectItem value="public">{tp.publico}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
                    <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                      {tp.cancelar}
                    </Button>
                              <Button onClick={handleChangeRole}>
                                {tp.guardarCambios}
                              </Button>
                            </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                  </div>
                );
            }
