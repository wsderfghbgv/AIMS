import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';

export default function AdminDashboard() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const statCards = [
    { title: 'Total aprendices', value: '698', highlight: true },
    { title: 'Instructores', value: '39', highlight: false },
    { title: 'Programas', value: '15', highlight: true },
    { title: 'Fichas activas', value: '26', highlight: false },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {isDesktop ? (
        <Text style={styles.title}>PANEL ADMINISTRATIVO</Text>
      ) : (
        <Text style={styles.mobileTitle}>Hola, Admi!</Text>
      )}

      <View style={styles.cardsContainer}>
        {statCards.map((card, index) => (
          <View key={index} style={[styles.card, !isDesktop && styles.mobileCard]}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={[styles.cardValue, card.highlight && styles.cardValueHighlight]}>
              {card.value}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.chartsContainer, !isDesktop && styles.chartsContainerMobile]}>
        {/* Bar Chart Mock */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>ASISTENCIA SEMANAL</Text>
          <View style={styles.barChart}>
            <View style={styles.yAxis}>
              <Text style={styles.axisText}>28</Text>
              <Text style={styles.axisText}>21</Text>
              <Text style={styles.axisText}>14</Text>
              <Text style={styles.axisText}>7</Text>
              <Text style={styles.axisText}>0</Text>
            </View>
            <View style={styles.barsArea}>
              <View style={styles.barColumn}>
                <View style={[styles.bar, { height: '50%' }]} />
                <Text style={styles.axisText}>S1</Text>
              </View>
              <View style={styles.barColumn}>
                <View style={[styles.bar, { height: '70%' }]} />
                <Text style={styles.axisText}>S2</Text>
              </View>
              <View style={styles.barColumn}>
                <View style={[styles.bar, { height: '65%' }]} />
                <Text style={styles.axisText}>S3</Text>
              </View>
              <View style={styles.barColumn}>
                <View style={[styles.bar, { height: '90%' }]} />
                <Text style={styles.axisText}>S4</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Doughnut Chart Mock */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>ESTADO DE APRENDICES</Text>
          <View style={styles.doughnutContainer}>
            <View style={styles.doughnutOuter}>
              <View style={styles.doughnutInner} />
            </View>
            {/* Mocking the little square detail in the image */}
            <View style={styles.doughnutDetail} />
          </View>
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
  title: {
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 30,
    color: '#333',
  },
  mobileTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
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
    minWidth: 150,
    flex: 1,
  },
  mobileCard: {
    minWidth: '45%',
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  cardValue: {
    fontSize: 24,
    color: '#333',
  },
  cardValueHighlight: {
    color: '#cfa235',
  },
  chartsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  chartsContainerMobile: {
    flexDirection: 'column',
  },
  chartCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 20,
    flex: 1,
    minHeight: 300,
  },
  chartTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  barChart: {
    flexDirection: 'row',
    height: 200,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  axisText: {
    fontSize: 12,
    color: '#555',
  },
  barsArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#999',
    paddingBottom: 25,
    position: 'relative',
  },
  barColumn: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: 30,
    position: 'relative',
    top: 25,
  },
  bar: {
    width: 30,
    backgroundColor: '#cfa235',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 5,
  },
  doughnutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  doughnutOuter: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 30,
    borderColor: '#cfa235',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doughnutInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'transparent',
  },
  doughnutDetail: {
    position: 'absolute',
    bottom: 25,
    right: '40%',
    width: 15,
    height: 15,
    backgroundColor: '#9c7926',
  }
});
