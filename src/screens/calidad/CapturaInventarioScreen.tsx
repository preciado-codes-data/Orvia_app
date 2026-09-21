import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Model, Alert } from 'react-native';
import { getProductos, Producto } from '../../services/inventarioService';

export const CapturaInventarioScreen = ({ route }: any) => {
    const { zona } = route.params;
    const [productos, stProductos] = useState<Producto[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

    // Formulario de captura
    const [cnatidad, setCantidad] = useState('');
    const [fechaCaducidad, setFechaCaducidad] = useState('');

    useEffect(() => {
        cargarCatalogo();
    }, []);

    const cargarCatalogo = async () => {
        const data = await getProductos();
        setProductos(data);
    };

    const productosFiltrados = productos.filter((p) =>
        p.nombre_producto.toLowerCase().includes(busqueda.toLowerCase())
    );

    const abrirCaptura = (producto: Producto) => {
        setSelectedProduct(producto);
        setCantidad('');
        setFechaCaducidad('');
        setModalVisible(true);
    };

    const guardarRegistro = () => {
        if (!cantidad || !fechaCaducidad) {
            Alert.alert('Atención', 'Por favor ingresa cantidad y fecha de caducidad (AAAA-MM-DD');
            return;
        }
        Alert.alert('Éxito','Registrado: ${selectedProduct?.nombre_producto} - Cantidad: ${cantidad}');
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.zonaBadge}>ZONA: {zona.nombre_zona}</Text>

            <TextInput
                style={styles.searchBar}
                placeholder="Buscar producto..."
                placeholderTextColor="#8892B0"
                value={busqueda}
                onChangeText={setBusqueda}
            />

            <FlatList
                data={productosFiltrados}
                keyExtractor={(item) => item.id_producto}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productCard} onPress={() => abrirCaptura(item)}>
                        <View>
                            <Text style={styles.productName}>{item.nombre_producto}</Text>
                            <Text style={styles.productDetail}>Empaque: {item.formato_recepcion} | Reg: {item.formato_registro}</Text>
                        </View>
                        <Text style={styles.addBtn}>+ Capturar</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Modal de Captura */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedProduct?.nombre_producto}</Text>

                        <Text style={styles.label}>Cantidad ({selectedProduct?.formato_registro}):</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Ej. 5"
                            placeholderTextColor="8892B0"
                            value={cantidad}
                            onChangeText={setCantidad}
                        />
                        
                        <Text style={styles.label}>Fecha Caducidad (YYYY-MM-DD):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="2026-10-15"
                            placeholderTextColor="#8892B0"
                            value={fechaCaducidad}
                            onChangeText={setFechaCaducidad}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.btnText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.btnText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#07152B', paddingHorizontal: 16, paddingTop: 20 },
    zonaBadge: { color: '#00D2FF', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
    searchBar: { backgroundColor: '#0E223D', borderRadius: 12, padding: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center' },
    productName: { color: '#FFF', fontSize: 16, fontWeight: '600' },
    productDetail: { color: '#8892B0', fontSize: 12, marginTop: 4 },
    addBtn: { color: '#00D2FF', fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: '#0E223D', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#1E3A5F' },
    modalTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    label: { color: '#8892B0', fontSize: 13, fontWeight: 'bold', marginBottom: 6 },
    input: { backgroundColor: '#162C4D', borderRadius: 8, padding: 12, color: '#FFF', marginBottom: 16 },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItem: 'center', marginHorizontal: 4 },
    btnCancel: { backgroundColor: '#334155' },
    btnSave: { backgroundColor: '#0084B4' },
    btnText: { color: '#FFF', fontWeight: 'bold' },

});