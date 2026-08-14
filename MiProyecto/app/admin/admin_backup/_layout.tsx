import { Slot, useRouter, usePathname } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Image, useWindowDimensions, Platform } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function AdminLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const [logoutHover, setLogoutHover] = useState(false);

  const menuItems = [
    { name: 'Inicio', path: '/admin' },
    { name: 'Usuarios', path: '/admin/usuarios' },
    { name: 'Programas', path: '/admin/programas' },
    { name: 'Fichas', path: '/admin/fichas' },
    { name: 'Aprendices', path: '/admin/aprendices' },
    { name: 'Instructores', path: '/admin/instructores' },
    { name: 'Matriculas', path: '/admin/matriculas' },
    { name: 'Asistencia', path: '/admin/asistencia' },
    { name: 'Calificación', path: '/admin/calificacion' },
    { name: 'Comunicación', path: '/admin/comunicacion' },
    { name: 'Reportes', path: '/admin/reportes' },
    { name: 'Configuración', path: '/admin/configuracion' },
  ];

  const MenuItem = ({ name, path }: { name: string, path: string }) => {
    const isActive = pathname === path;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Pressable
        onPress={() => router.push(path as any)}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={[
          styles.menuItem,
          isActive && styles.menuItemActive,
          isHovered && !isActive && styles.menuItemHover,
        ]}
      >
        <Text style={[
          styles.menuText,
          (isActive || isHovered) && styles.menuTextActive
        ]}>
          {name}
        </Text>
      </Pressable>
    );
  };

  if (!isDesktop) {
    return (
      <View style={styles.container}>
        <View style={styles.mobileHeader}>
          <Ionicons name="menu" size={32} color="black" />
          <View style={styles.mobileHeaderRight}>
            <Ionicons name="notifications-outline" size={24} color="black" style={{ marginRight: 15 }} />
            <Ionicons name="person-circle" size={32} color="black" />
          </View>
        </View>
        
        <View style={styles.content}>
          <Slot />
        </View>

        <View style={styles.mobileNav}>
          <Text style={styles.mobileNavText}>Inicio</Text>
          <Text style={styles.mobileNavText}>Usuarios</Text>
          <Text style={styles.mobileNavText}>Programas</Text>
          <Text style={styles.mobileNavText}>Reportes</Text>
          <Text style={styles.mobileNavText}>Más</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>A I M S</Text>
          <Text style={styles.adminSubtitle}>Administrador</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <MenuItem key={item.name} name={item.name} path={item.path} />
          ))}
        </View>

        <Pressable 
          style={styles.logoutBtn}
          onHoverIn={() => setLogoutHover(true)}
          onHoverOut={() => setLogoutHover(false)}
        >
          <Text style={[styles.logoutText, logoutHover && styles.logoutTextHover]}>
            Cerrar Sesión →
          </Text>
        </Pressable>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#040b16', // Dark blue color from screenshot
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  logoContainer: {
    padding: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  adminSubtitle: {
    color: '#FFFFFF',
    marginTop: 20,
    fontSize: 14,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  menuItemActive: {
    backgroundColor: '#cfa235', // Yellow from screenshot
  },
  menuItemHover: {
    backgroundColor: 'rgba(207, 162, 53, 0.2)', // Yellow hover
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  menuTextActive: {
    color: '#FFFFFF',
  },
  logoutBtn: {
    padding: 30,
    marginTop: 'auto',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  logoutTextHover: {
    color: '#FF4444', // Red hover for logout
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'auto',
  },
  // Mobile styles
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  mobileHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobileNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#040b16',
    paddingVertical: 15,
  },
  mobileNavText: {
    color: '#FFFFFF',
    fontSize: 14,
  }
});
