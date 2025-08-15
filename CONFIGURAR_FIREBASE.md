# 🔥 Configurar Firebase - Guía Rápida

## 📋 Archivos Creados

He creado los siguientes archivos para que puedas configurar Firebase:

### 1. `.env.local` (Archivo local - NO se sube a Git)
Este archivo contiene las variables de entorno que necesitas configurar con tus credenciales reales de Firebase.

**Ubicación**: `/home/z/my-project/.env.local`

### 2. `.env.example` (Archivo de ejemplo - SÍ se sube a Git)
Este archivo sirve como plantilla para que otros desarrolladores sepan qué variables de entorno necesitan configurar.

**Ubicación**: `/home/z/my-project/.env.example`

## 🚀 Pasos para Configurar Firebase

### Paso 1: Obtener tus credenciales de Firebase

1. **Ve a Firebase Console**: https://console.firebase.google.com/
2. **Crea un nuevo proyecto**:
   - Nombre: `galaxy-restaurant-system`
   - Sigue los pasos de configuración
3. **Habilita Firestore Database**:
   - Ve a "Firestore Database"
   - Haz clic en "Crear base de datos"
   - Selecciona "Empezar en modo de prueba"
   - Elige una ubicación (ej: `us-central1`)
   - Haz clic en "Habilitar"
4. **Obtén tus credenciales**:
   - Ve a "Configuración del proyecto" (⚙️)
   - En la pestaña "General", copia las siguientes credenciales:
     - API Key
     - Auth Domain
     - Project ID
     - Storage Bucket
     - Messaging Sender ID
     - App ID

### Paso 2: Configurar el archivo `.env.local`

1. **Abre el archivo**:
   ```bash
   nano /home/z/my-project/.env.local
   ```

2. **Reemplaza los valores de ejemplo** con tus credenciales reales:

   ```bash
   # Ejemplo de cómo debería quedar:
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBv2aXc3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=galaxy-restaurant-system-12345.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=galaxy-restaurant-system-12345
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=galaxy-restaurant-system-12345.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
   ```

3. **Guarda el archivo**:
   - En nano: `Ctrl + X`, luego `Y`, luego `Enter`

### Paso 3: Probar la configuración

1. **Reinicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Abre la página de configuración**:
   - URL: http://localhost:3000/setup-firebase

3. **Usa el asistente de configuración**:
   - Completa todos los campos del formulario
   - Haz clic en "Guardar Configuración"
   - Haz clic en "Probar Conexión"

4. **Verifica los resultados**:
   - Si la conexión es exitosa, verás un badge verde "Conectado"
   - Podrás ver las métricas de datos guardados
   - Recibirás un mensaje de confirmación

### Paso 4: Probar en la aplicación principal

1. **Ve a la aplicación principal**:
   - URL: http://localhost:3000/

2. **Prueba las funcionalidades**:
   - Crea un producto
   - Crea una receta
   - Crea un pedido
   - Verifica que los datos se guardan correctamente

## 🔧 Verificación

Para verificar que todo funciona correctamente, puedes:

1. **Ir a la página de prueba**: http://localhost:3000/test-firebase
2. **Verificar que los datos se guardan**: Intenta crear, editar y eliminar elementos
3. **Recargar la página**: Los datos deben persistir después de recargar

## 🚨 Solución de Problemas Comunes

### Error: "Permission denied"
**Solución**: Ve a Firebase Console → Firestore Database → Reglas y cambia temporalmente las reglas a:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Error: "Invalid API Key"
**Solución**: Verifica que hayas copiado la API Key correctamente y no incluyas espacios adicionales.

### Error: "Module not found"
**Solución**: Instala las dependencias de Firebase:
```bash
npm install firebase
```

## 📚 Documentación Adicional

- **Guía completa**: `FIREBASE_SETUP_INSTRUCTIONS.md`
- **Asistente de configuración**: http://localhost:3000/setup-firebase
- **Página de prueba**: http://localhost:3000/test-firebase

## 🎯 ¡Listo!

Una vez que hayas configurado tus credenciales reales, tu **Galaxy Restaurant System** estará completamente funcional con Firebase, con sincronización en tiempo real y persistencia de datos.

---

**🤖 Generated with [Claude Code](https://claude.ai/code)**

**Co-Authored-By: Claude <noreply@anthropic.com>**