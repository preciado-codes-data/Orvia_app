import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DashboardCalidadScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Control de Calidad - ORVIA</Text>
            <Text style={styles.subtitle}>Captura de caducidades y escaneo QR</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '0A192F', justifyContent: 'center', alignItems: 'center', padding:20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#00D2FF', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#8892B0' },
});