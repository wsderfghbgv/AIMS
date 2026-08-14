import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, useWindowDimensions } from 'react-native';

export default function UsuariosAdmin() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const statCards = [
    { title: 'ADMINISTRADORES', value: '3', subtitle: 'ACTIVOS' },
    { title: 'INSTRUCTORES', value: '39', subtitle: 'ACTIVOS' },
    { title: 'APRENDICES', value: '15', subtitle: 'MATRICULADOS' },
  ];

  const users = [
    { name: 'Roberto Vargas', role: 'Instructor', email: 'rvargas@sena.edu.co', status: 'Activo' },
    { name: 'Carmen Lopez', role: 'Instructor', email: 'clopez@sena.edu.co', status: 'Activo' },
    { name: 'Ana Gomez', role: 'Administrador', email: 'agomez@sena.edu.co', status: 'Critico' },
    { name: 'Maria Torres', role: 'Aprendiz', email: 'mtorres@sena.edu.co', status: 'Activo' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Usuarios</Text>
        <Pressable style={styles.newButton}>
          <Text style={styles.newButtonText}>+ Nuevo</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {statCards.map((card, index) => (
          <View key={index} style={[styles.card, !isDesktop && styles.mobileCard]}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardValue}>{card.value}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.filters}>
          <TextInput 
            style={[styles.searchInput, !isDesktop && styles.mobileSearchInput]} 
            placeholder="Buscar por nombre, correo o rol"
            placeholderTextColor="#888"
          />
          <View style={[styles.dropdown, !isDesktop && styles.mobileDropdown]}>
            <Text style={styles.dropdownText}>Todos los roles</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>NOMBRE</Text>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>ROL</Text>
            <Text style={[styles.tableHeaderText, { flex: 3 }]}>CORREO</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>ESTADO</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}></Text>
          </View>

          {users.map((user, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]} numberOfLines={1}>{user.name}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]} numberOfLines={1}>{user.role}</Text>
              <Text style={[styles.tableCell, { flex: 3 }]} numberOfLines={1}>{user.email}</Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]} numberOfLines={1}>{user.status}</Text>
              <Pressable style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.editLink}>Editar</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    color: '#333',
  },
  newButton: {
    backgroundColor: '#cfa235',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  newButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 20,
    flex: 1,
    minWidth: 200,
  },
  mobileCard: {
    minWidth: '100%',
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  cardValue: {
    fontSize: 24,
    color: '#cfa235',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#555',
  },
  tableContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 20,
  },
  filters: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 2,
    minWidth: 200,
  },
  mobileSearchInput: {
    flex: 1,
    minWidth: '100%',
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
    minWidth: 150,
  },
  mobileDropdown: {
    flex: 1,
    minWidth: '100%',
  },
  dropdownText: {
    color: '#888',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
  },
  editLink: {
    fontSize: 14,
    color: '#333',
    textDecorationLine: 'underline',
  }
});
