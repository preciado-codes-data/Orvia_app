import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DashboardGerenteScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Panel Gerencial - ORVIA</Text>
            <Text style={styles.subTitle}>Visión general de inventarios y recorridos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0A192F', justifyContent: 'center', alignItems: 'center', padding: 20},
    title: { fontSize: 24, fontWeight: 'bold', color: '#00D2FF', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#8892B0' },
});