import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* Definimos nuestra pantalla principal (index.tsx) y le ocultamos la barra superior para que se vea el fondo oscuro completo */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      {/* Ponemos la barra de estado del celular (hora, batería) en color claro para que resalte con el fondo oscuro */}
      <StatusBar style="light" />
    </>
  );
}
