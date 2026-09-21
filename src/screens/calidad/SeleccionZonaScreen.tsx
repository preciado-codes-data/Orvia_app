import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getZonasBySucursal, Zona } from '../../services/inventarioService';

export const SeleccionZonaScreen = ({ navigation }: any) => {
    const { user } = useAuth();
    const [Zonas, setZonas] = useState<Zona[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarZonas();
    }, []);

    const cargarZonas = async () => {
        if (user?.id_sucursal) {
            const data = await getZonasBySucursal(user.id_sucursal);
            setZonas(data);
        }
        setLoading(false);
    };

    const handleSelectZona = (zona: Zona) => {
        navigation.navigate('CapturaInventario', { zona });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Selecciona la Zona</Text>
            <Text style={styles.headerSubtitle}>Sucursal: {user?.nombre_sucursal || 'Villa de Álvarez'}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#00D2FF" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data = {Zona}
                    keyExtractor={(item) => item.id_zona}
                    contentContainerStyle={{ paddingTop: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.zonaCard} onPress={() => handleSelectZona(item)}>
                            <View>
                                <Text style={styles.zonaName}>{item.nombre_zona}</Text>
                                <Text style={styles.zonaDetail}>Orden de recorrido #{item.orden}</Text>
                            </View>
                            <Text style={styles.arrow}>→</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#07152b', paddingHorizontal: 20, paddingTop: 40 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
    headerSubtitle: { fontSize: 14, color: '#8892B0', marginTop: 4, marginBottom: 16 },
    zonaCard: { backgroundColor: '#0E223D', borderRadius: 14, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: '#1E3A5F', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    zonaName: { fontSize: 18, fontWeight: 'bold', color: '#00D2FF' },
    zonaDetail: { fontSize: 12, color: '#8892B0', marginTop: 4 },
    arrow: { fontSize: 22, color: '#00D2FF', fontWeight: 'bold' },
});