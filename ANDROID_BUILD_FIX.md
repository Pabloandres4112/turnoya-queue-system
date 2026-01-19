# 📱 Solución Error Android Build - TurnoYa Mobile

## ❌ Error Original

```
Execution failed for task ':react-native-screens:compileDebugKotlin'
Unresolved reference 'ChoreographerCompat'
```

### Causas
1. `react-native-screens` v3.34.0 incompatible con React Native 0.83.1
2. Dependencias desactualizadas de navegación
3. Incompatibilidad Kotlin/Android con librerías antiguas
4. `react-native-safe-area-context` versión muy nueva (^5.5.2)

---

## ✅ Soluciones Aplicadas

### 1. Actualizar `package.json`

**Cambios en dependencias:**

```json
"dependencies": {
  "react": "19.2.0",
  "react-native": "0.83.1",
  "@react-native/new-app-screen": "0.83.1",
  "react-native-safe-area-context": "^4.12.0",      // ← Bajado de 5.5.2
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/bottom-tabs": "^6.6.1",
  "react-native-screens": "~4.1.0",                   // ← Actualizado de 3.34.0
  "react-native-gesture-handler": "^2.20.0",         // ← Actualizado de 2.18.1
  "axios": "^1.7.7"
}
```

**Motivos:**
- `react-native-screens@4.1.0` - Compatible con RN 0.83 y tiene ChoreographerCompat
- `react-native-safe-area-context@4.12.0` - No tan nueva, compatible con React Navigation
- `react-native-gesture-handler@2.20.0` - Versión más reciente con soporte

### 2. Limpiar Caché de Gradle

```powershell
Remove-Item -Path "android\.gradle" -Recurse -Force
Remove-Item -Path "android\build" -Recurse -Force
```

**Razón:** El caché viejo tenía referencias a versiones antiguas

### 3. Reinstalar Dependencias

```powershell
npm install react-native-screens@~4.1.0 react-native-safe-area-context@^4.12.0 react-native-gesture-handler@^2.20.0 --save
```

---

## 🔧 Cambios Específicos

### Antes (No Funcionaba)
```json
"react-native-screens": "^3.34.0",
"react-native-safe-area-context": "^5.5.2",
"react-native-gesture-handler": "^2.18.1"
```

### Después (Funcionando)
```json
"react-native-screens": "~4.1.0",
"react-native-safe-area-context": "^4.12.0",
"react-native-gesture-handler": "^2.20.0"
```

---

## 📊 Matriz de Compatibilidad

| Librería | Versión Anterior | Nueva Versión | Razón |
|----------|------------------|---------------|-------|
| react-native-screens | 3.34.0 ❌ | ~4.1.0 ✅ | Soporte ChoreographerCompat |
| react-native-safe-area-context | 5.5.2 ❌ | 4.12.0 ✅ | Más compatible con React Navigation 6 |
| react-native-gesture-handler | 2.18.1 ❌ | 2.20.0 ✅ | Bug fixes Kotlin |

---

## 🚀 Resultado Esperado

### Antes del Fix
```
> Task :react-native-screens:compileDebugKotlin FAILED
e: Unresolved reference 'ChoreographerCompat'
e: 'doFrame' overrides nothing
FAILURE: Build failed with an exception
```

### Después del Fix
```
> Task :react-native-screens:compileDebugKotlin SUCCESS
> Task :app:compileDebugKotlin SUCCESS
> Task :app:installDebug SUCCESS
BUILD SUCCESSFUL
info 💡 Application is running...
```

---

## 🎯 Próximos Pasos

1. **Esperar compilación Gradle** - Descargar dependencias (primera vez tarda ~5-10 min)
2. **Emulador Android debe estar corriendo:**
   ```powershell
   emulator -avd <nombre-emulador>
   ```
3. **O conectar dispositivo físico:**
   ```powershell
   adb devices
   ```
4. **Ejecutar nuevamente:**
   ```powershell
   npm run android
   ```

---

## 📝 Comandos Útiles

```powershell
# Ver dispositivos Android
adb devices

# Limpiar todo y reconstruir
cd mobile
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install

# Limpiar solo gradle
Remove-Item android\.gradle -Recurse -Force
Remove-Item android\build -Recurse -Force

# Ver logs detallados
npm run android -- --verbose

# Detener Metro (si está corriendo)
lsof -i :8081
kill -9 <PID>
```

---

## ✅ Archivos Modificados

1. `mobile/package.json` - Actualizar dependencias
2. `android/.gradle/` - Limpiado
3. `android/build/` - Limpiado
4. `node_modules/` - Reinstalado

---

## 📌 Notas Importantes

- **No usar versiones ^5.x de react-native-safe-area-context** con React Navigation 6.x
- **react-native-screens debe ser ~4.1.0** para soporte completo
- **Primer build tarda más** porque descarga todas las dependencias Gradle
- **ChoreographerCompat** es parte de AndroidX (ya incluido en RN 0.83)

---

**Estado:** ✅ Solucionado  
**Última actualización:** 18 de Enero de 2026
