import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthScreen() {
  // Screen state: 'login' (default) | 'register'
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');

  // Login Form State
  const [loginCorreo, setLoginCorreo] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form State
  const [regNombre, setRegNombre] = useState('');
  const [regCorreo, setRegCorreo] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  const handleLogin = () => {
    console.log("Iniciar sesión:", { loginCorreo, loginPassword, rememberMe });
  };

  const handleRegister = () => {
    console.log("Registrar cuenta:", { regNombre, regCorreo, regPassword, regConfirmPassword });
  };

  return (
    <View style={styles.outerContainer}>
      {/* Dark Academia Deep Midnight Navy Gradient */}
      <LinearGradient
        colors={['#020308', '#070C20', '#0E1738', '#141E47', '#050816']}
        locations={[0, 0.25, 0.55, 0.8, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Dark Academia Satin Gold & Sapphire Ambient Glow Orbs */}
      <View style={[styles.glowOrb, styles.goldSatinSpotlight]} />
      <View style={[styles.glowOrb, styles.sapphireGlowCenter]} />
      <View style={[styles.glowOrb, styles.amberGoldGlowBottom]} />
      <View style={[styles.glowOrb, styles.radialCenterHalo]} />

      {/* Academic Constellation Star Dust Dots */}
      <View style={[styles.constellationDot, { top: '12%', left: '18%' }]} />
      <View style={[styles.constellationDot, { top: '28%', right: '15%' }]} />
      <View style={[styles.constellationDot, { top: '55%', left: '10%' }]} />
      <View style={[styles.constellationDot, { top: '78%', right: '22%' }]} />
      <View style={[styles.constellationDot, { top: '85%', left: '30%' }]} />

      {/* Floating Academic & Tech Constellation Seals */}
      <View style={[styles.techNode, styles.techNodeGold, { top: '14%', right: '7%' }]}>
        <Ionicons name="book-outline" size={20} color="#D4AF37" />
      </View>
      <View style={[styles.techNode, styles.techNodeBlue, { top: '38%', right: '4%' }]}>
        <Ionicons name="git-network-outline" size={22} color="#60A5FA" />
      </View>
      <View style={[styles.techNode, styles.techNodeGold, { top: '72%', right: '8%' }]}>
        <Ionicons name="school-outline" size={20} color="#E5C158" />
      </View>
      <View style={[styles.techNode, styles.techNodeBlue, { top: '20%', left: '5%' }]}>
        <Ionicons name="hardware-chip-outline" size={20} color="#60A5FA" />
      </View>
      <View style={[styles.techNode, styles.techNodeGold, { top: '66%', left: '6%' }]}>
        <Ionicons name="code-slash-outline" size={20} color="#D4AF37" />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('../assets/images/logo.jpeg')} 
              style={styles.headerLogo} 
              resizeMode="contain" 
            />
            <View style={styles.headerTextGroup}>
              <Text style={styles.headerTitle}>ACADEMIC INTELLIGENT</Text>
              <Text style={styles.headerSubtitle}>MANAGEMENT SYSTEM</Text>
            </View>
          </View>
          <Text style={styles.headerRightText}>AIMS</Text>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flexContainer}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* ================= INICIO DE SESIÓN (DEFAULT) ================= */}
            {currentScreen === 'login' && (
              <View style={styles.lightCard}>
                <View style={styles.lightLogoContainer}>
                  <Image 
                    source={require('../assets/images/logo.jpeg')} 
                    style={styles.lightLogoImg} 
                    resizeMode="contain" 
                  />
                  <Text style={styles.lightLogoText}>AIMS</Text>
                </View>

                <Text style={styles.cardTitleLight}>INICIO DE SESIÓN</Text>

                {/* Correo / Matrícula */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.labelLight}>Correo Institucional / Matrícula</Text>
                  <View style={styles.borderedInputWrapper}>
                    <Ionicons name="mail" size={18} color="#475569" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.borderedInput}
                      placeholder="vtorres@formacionsena.edu.co"
                      placeholderTextColor="#94A3B8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={loginCorreo}
                      onChangeText={setLoginCorreo}
                    />
                  </View>
                </View>

                {/* Contraseña */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.labelLight}>Contraseña</Text>
                  <View style={styles.borderedInputWrapper}>
                    <Ionicons name="lock-closed" size={18} color="#475569" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.borderedInput}
                      placeholder="••••••••••••"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showLoginPassword}
                      value={loginPassword}
                      onChangeText={setLoginPassword}
                    />
                    <TouchableOpacity onPress={() => setShowLoginPassword(!showLoginPassword)}>
                      <Ionicons name={showLoginPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Options Row: Checkbox & Forgot Password */}
                <View style={styles.optionsRow}>
                  <TouchableOpacity 
                    style={styles.checkboxRow} 
                    activeOpacity={0.7}
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <Ionicons 
                      name={rememberMe ? "checkbox" : "square-outline"} 
                      size={18} 
                      color={rememberMe ? "#C59427" : "#64748B"} 
                    />
                    <Text style={styles.rememberText}>Recordar mis datos</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                  </TouchableOpacity>
                </View>

                {/* Submit Login Button */}
                <TouchableOpacity style={styles.goldButton} activeOpacity={0.85} onPress={handleLogin}>
                  <Text style={styles.goldButtonText}>INICIAR SESIÓN →</Text>
                </TouchableOpacity>

                {/* Social Login Separator */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>O inicia sesión con:</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social Buttons (Outlook & Google) */}
                <View style={styles.socialRow}>
                  <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                    <Ionicons name="mail" size={22} color="#0078D4" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                    <Ionicons name="logo-google" size={22} color="#EA4335" />
                  </TouchableOpacity>
                </View>

                {/* Switch to Register Button */}
                <View style={styles.switchContainer}>
                  <Text style={styles.switchTextLight}>¿No tienes una cuenta? </Text>
                  <TouchableOpacity onPress={() => setCurrentScreen('register')}>
                    <Text style={styles.goldLink}>Regístrate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* ================= REGISTRO DE CUENTA ================= */}
            {currentScreen === 'register' && (
              <View style={styles.darkCard}>
                <View style={styles.cardHeaderLogo}>
                  <Image 
                    source={require('../assets/images/logo.jpeg')} 
                    style={styles.cardLogoImg} 
                    resizeMode="contain" 
                  />
                  <View>
                    <Text style={styles.cardLogoTitle}>ACADEMIC INTELLIGENT</Text>
                    <Text style={styles.cardLogoSubtitle}>MANAGEMENT SYSTEM</Text>
                  </View>
                </View>

                <Text style={styles.cardTitleDark}>REGISTRO</Text>

                {/* Nombre Completo */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.labelDark}>Nombre Completo</Text>
                  <View style={styles.whiteInputWrapper}>
                    <Ionicons name="person" size={18} color="#475569" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.whiteInput}
                      placeholder="Valentina Torres"
                      placeholderTextColor="#94A3B8"
                      value={regNombre}
                      onChangeText={setRegNombre}
                    />
                  </View>
                </View>

                {/* Correo Institucional */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.labelDark}>Correo Institucional</Text>
                  <View style={styles.whiteInputWrapper}>
                    <Ionicons name="mail" size={18} color="#475569" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.whiteInput}
                      placeholder="vtorres@formacionsena.edu.co"
                      placeholderTextColor="#94A3B8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={regCorreo}
                      onChangeText={setRegCorreo}
                    />
                  </View>
                </View>

                {/* Contraseña */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.labelDark}>Contraseña</Text>
                  <View style={styles.whiteInputWrapper}>
                    <Ionicons name="lock-closed" size={18} color="#475569" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.whiteInput}
                      placeholder="••••••••••••"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showRegPassword}
                      value={regPassword}
                      onChangeText={setRegPassword}
                    />
                    <TouchableOpacity onPress={() => setShowRegPassword(!showRegPassword)}>
                      <Ionicons name={showRegPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirmar Contraseña */}
                <View style={styles.fieldGroup}>
                  <Text style={styles.labelDark}>Confirmar Contraseña</Text>
                  <View style={styles.whiteInputWrapper}>
                    <Ionicons name="lock-closed" size={18} color="#475569" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.whiteInput}
                      placeholder="••••••••••••"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showRegConfirmPassword}
                      value={regConfirmPassword}
                      onChangeText={setRegConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowRegConfirmPassword(!showRegConfirmPassword)}>
                      <Ionicons name={showRegConfirmPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Submit Register Button */}
                <TouchableOpacity style={styles.goldButton} activeOpacity={0.85} onPress={handleRegister}>
                  <Text style={styles.goldButtonText}>CREAR CUENTA →</Text>
                </TouchableOpacity>

                {/* Switch back to Login */}
                <View style={styles.switchContainer}>
                  <Text style={styles.switchTextDark}>¿Ya tienes una cuenta? </Text>
                  <TouchableOpacity onPress={() => setCurrentScreen('login')}>
                    <Text style={styles.goldLink}>Inicia Sesión</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

          </ScrollView>
        </KeyboardAvoidingView>

        {/* Footer Bar */}
        <View style={styles.footerBar}>
          <Text style={styles.footerText}>© 2026 AIMS - Academic Intelligent Management System</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#020308',
  },
  safeArea: {
    flex: 1,
  },
  /* AMBIENT GLOW ORBS (DARK ACADEMIA SATIN GOLD & SAPPHIRE) */
  glowOrb: {
    position: 'absolute',
    borderRadius: 999,
  },
  goldSatinSpotlight: {
    width: 500,
    height: 500,
    backgroundColor: '#D4AF37',
    opacity: 0.16,
    top: -160,
    left: '50%',
    transform: [{ translateX: -250 }],
  },
  sapphireGlowCenter: {
    width: 440,
    height: 440,
    backgroundColor: '#1E3A8A',
    opacity: 0.22,
    top: '30%',
    right: -110,
  },
  amberGoldGlowBottom: {
    width: 380,
    height: 380,
    backgroundColor: '#C59427',
    opacity: 0.18,
    bottom: -90,
    left: -70,
  },
  radialCenterHalo: {
    width: 320,
    height: 320,
    backgroundColor: '#60A5FA',
    opacity: 0.07,
    top: '35%',
    left: '20%',
  },

  /* CONSTELLATION STAR DUST DOTS */
  constellationDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D4AF37',
    opacity: 0.45,
    zIndex: 1,
  },

  /* FLOATING ACADEMIC & TECH NODES */
  techNode: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(10, 15, 36, 0.75)',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 6,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      },
    }),
  },
  techNodeGold: {
    borderColor: 'rgba(212, 175, 55, 0.45)',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  techNodeBlue: {
    borderColor: 'rgba(96, 165, 250, 0.45)',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 10,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  headerTextGroup: {
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 8,
    letterSpacing: 1,
  },
  headerRightText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  flexContainer: {
    flex: 1,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },

  /* LIGHT CARD (INICIO DE SESIÓN) */
  lightCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 32,
    borderTopWidth: 4,
    borderTopColor: '#D4AF37',
    shadowColor: '#020308',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 28,
    elevation: 14,
  },
  lightLogoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  lightLogoImg: {
    width: 54,
    height: 54,
  },
  lightLogoText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 4,
  },
  cardTitleLight: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 22,
    letterSpacing: 1.5,
  },
  labelLight: {
    color: '#1E293B',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  borderedInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    height: 48,
  },
  borderedInput: {
    flex: 1,
    color: '#0F172A',
    fontSize: 13,
    height: '100%',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: '#475569',
    fontSize: 12,
    marginLeft: 6,
  },
  forgotText: {
    color: '#475569',
    fontSize: 12,
    textDecorationLine: 'underline',
  },

  /* DARK CARD (REGISTRO) */
  darkCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#0F142D',
    borderRadius: 22,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 28,
    elevation: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderTopWidth: 4,
    borderTopColor: '#D4AF37',
  },
  cardHeaderLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLogoImg: {
    width: 44,
    height: 44,
    marginRight: 10,
  },
  cardLogoTitle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  cardLogoSubtitle: {
    color: '#94A3B8',
    fontSize: 8,
    letterSpacing: 0.8,
  },
  cardTitleDark: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 22,
    letterSpacing: 1.5,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  labelDark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  whiteInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  fieldIcon: {
    marginRight: 10,
  },
  whiteInput: {
    flex: 1,
    color: '#0F172A',
    fontSize: 13,
    height: '100%',
  },

  /* BUTTONS & FOOTERS */
  goldButton: {
    backgroundColor: '#C59427',
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#C59427',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  goldButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchTextDark: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  switchTextLight: {
    color: '#475569',
    fontSize: 12,
  },
  goldLink: {
    color: '#C59427',
    fontSize: 12,
    fontWeight: '700',
  },

  /* SOCIAL SECTION */
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    color: '#64748B',
    fontSize: 11,
    marginHorizontal: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 60,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },

  /* FOOTER */
  footerBar: {
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 10,
  },
  footerText: {
    color: '#64748B',
    fontSize: 11,
  },
});
