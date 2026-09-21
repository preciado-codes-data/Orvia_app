import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { loginUsuario } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

export const LoginScreen = ({ navigation }: any) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [recordar, setRecordar] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (!usuario || !password) {
      Alert.alert('Error', 'Por favor ingresa usuario y contraseña');
      return;
    }

    setLoading(true);
    const userAuth = await loginUsuario(usuario, password);
    setTimeout(() => {
      setLoading(false);
      if (!userAuth) {
        Alert.alert('Acceso Denegado', 'Usuario o contraseña incorrectos');
        return;
      }

      setUser(userAuth);

      // Redirección por rol
      if (userAuth.rol_nombre === 'Gerente' || userAuth.rol_nombre === 'Subgerente') {
        navigation.replace('DashboardGerente');
      } else {
        navigation.replace('DashboardCalidades');
      }
    }, 800);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.brandTitle}>ORVIA</Text>
        <Text style={styles.subTitle}>Inventario Guiado de Caducidades</Text>
        <Text style={styles.tagline}>Control de caducidades · Mejores decisiones</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.loginTitle}>Iniciar sesión</Text>
        <Text style={styles.loginDesc}>Accede a tu cuenta para continuar con el inventario guiado.</Text>

        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: PHRP1583"
          placeholderTextColor="#8892B0"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#8892B0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.rowRemember}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRecordar(!recordar)}>
            <View style={[styles.checkbox, recordar && styles.checkboxChecked]} />
            <Text style={styles.rememberText}>Recordar usuario</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Alert.alert('Soporte', 'Contacta al Administrador del sistema')}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar sesión →</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Operadora de Restaurantes de Colima · Pizza Hut</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07152B', justifyContent: 'center', paddingHorizontal: 24 },
  headerContainer: { alignItems: 'center', marginBottom: 28 },
  brandTitle: { fontSize: 44, fontWeight: 'bold', color: '#00D2FF', letterSpacing: 3 },
  subTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginTop: 4 },
  tagline: { fontSize: 12, color: '#8892B0', marginTop: 4 },
  card: { backgroundColor: '#0E223D', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#1E3A5F' },
  loginTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  loginDesc: { fontSize: 13, color: '#8892B0', marginBottom: 20, marginTop: 4 },
  label: { fontSize: 13, color: '#8892B0', marginBottom: 6 },
  input: { backgroundColor: '#162C4D', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12, color: '#FFF', fontSize: 15, marginBottom: 16, borderWidth: 1, borderColor: '#234470' },
  rowRemember: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: '#8892B0', marginRight: 8 },
  checkboxChecked: { backgroundColor: '#00D2FF', borderColor: '#00D2FF' },
  rememberText: { color: '#8892B0', fontSize: 12 },
  forgotText: { color: '#00D2FF', fontSize: 12 },
  loginButton: { backgroundColor: '#0084B4', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  loginButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footerText: { color: '#8892B0', textAlign: 'center', marginTop: 28, fontSize: 12 },
});