# 🚀 Guía Completa de Configuración de Firebase

## 📋 Tabla de Contenido
1. [Requisitos Previos](#requisitos-previos)
2. [Crear Proyecto en Firebase](#crear-proyecto-en-firebase)
3. [Obtener Credenciales](#obtener-credenciales)
4. [Configurar Variables de Entorno](#configurar-variables-de-entorno)
5. [Probar Conexión](#probar-conexión)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🔥 Requisitos Previos

### 1. Cuenta de Google
- Necesitarás una cuenta de Google para usar Firebase Console
- Si no tienes una, créala en: https://accounts.google.com/

### 2. Proyecto de Firebase
- Acceso a Firebase Console
- Permisos para crear proyectos y habilitar servicios

### 3. Conocimientos Técnicos
- Nociones básicas de JavaScript/TypeScript
- Familiaridad con la línea de comandos
- Conocimientos básicos de Firebase

---

## 📝 Paso 1: Crear Proyecto en Firebase

### 1.1 Acceder a Firebase Console
1. Ve a: https://console.firebase.google.com/
2. Inicia sesión con tu cuenta de Google
3. Si es tu primera vez, acepta los términos y condiciones

### 1.2 Crear Nuevo Proyecto
1. Haz clic en "Crear proyecto"
2. Dale un nombre a tu proyecto: `galaxy-restaurant-system`
3. Selecciona tu país/región
4. Haz clic en "Continuar"
5. Habilita Google Analytics (opcional pero recomendado)
6. Selecciona una cuenta de Analytics o crea una nueva
7. Haz clic en "Crear proyecto"

### 1.3 Esperar Creación del Proyecto
- El sistema tardará unos minutos en crear tu proyecto
- Una vez listo, haz clic en "Continuar"

---

## 🔧 Paso 2: Habilitar Firestore Database

### 2.1 Acceder a Firestore
1. En tu proyecto, busca "Firestore Database" en el menú lateral
2. Haz clic en "Crear base de datos"

### 2.2 Configurar Firestore
1. **Seleccionar modo de inicio**: Elige "Empezar en modo de prueba"
   - Esto permite 50,000 lecturas diarias gratuitas
   - Perfecto para desarrollo y pruebas

2. **Seleccionar ubicación**: Elige la ubicación más cercana a tus usuarios
   - Recomendación: `us-central1` (Estados Unidos)
   - Importante: Esta decisión no puede cambiarse después

3. **Habilitar Firestore**: Haz clic en "Habilitar"

### 2.3 Configurar Reglas de Seguridad
1. Una vez habilitado, ve a la pestaña "Reglas"
2. Las reglas por defecto permiten acceso de solo lectura:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```
3. Para desarrollo, puedes cambiar temporalmente a:
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
4. Haz clic en "Publicar"

---

## 🔑 Paso 3: Obtener Credenciales

### 3.1 Acceder a Configuración del Proyecto
1. Ve a tu proyecto en Firebase Console
2. Haz clic en el ícono de engranaje ⚙️ junto a "Project Overview"
3. Selecciona "Configuración del proyecto"

### 3.2 Obtener Credenciales
En la pestaña "General", encontrarás las siguientes credenciales:

#### 3.2.1 API Key
- Campo: `API Key`
- Formato: `AIzaSy...`
- Copia este valor

#### 3.2.2 Auth Domain
- Campo: `Auth Domain`
- Formato: `tu-proyecto.firebaseapp.com`
- Copia este valor

#### 3.2.3 Project ID
- Campo: `Project ID`
- Formato: `tu-proyecto-12345`
- Copia este valor

#### 3.2.4 Storage Bucket
- Campo: `Storage Bucket`
- Formato: `tu-proyecto.appspot.com`
- Copia este valor

#### 3.2.5 Messaging Sender ID
- Campo: `Messaging Sender ID`
- Formato: `123456789`
- Copia este valor

#### 3.2.6 App ID
- Campo: `App ID`
- Formato: `1:123456789:web:abcdef123456`
- Copia este valor

---

## 📁 Paso 4: Configurar Variables de Entorno

### 4.1 Crear archivo .env.local
En la raíz de tu proyecto, crea un archivo llamado `.env.local`:

```bash
touch .env.local
```

### 4.2 Agregar credenciales al archivo
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_real
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain_real
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id_real
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_real
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id_real
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id_real
```

### 4.3 Reemplazar valores
Reemplaza los valores de ejemplo con tus credenciales reales:

```bash
# Ejemplo:
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBv2aXc3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=galaxy-restaurant-system.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=galaxy-restaurant-system-12345
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=galaxy-restaurant-system.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

### 4.4 Importante: Seguridad
- El archivo `.env.local` no debe subirse a Git
- Ya está incluido en `.gitignore`
- Si usas control de versiones, crea un archivo `.env.example` con valores de ejemplo

---

## 🧪 Paso 5: Probar Conexión

### 5.1 Acceder a la página de configuración
1. Inicia tu servidor de desarrollo:
   ```bash
   npm run dev
   ```
2. Abre tu navegador en: http://localhost:3000/setup-firebase

### 5.2 Usar el Asistente de Configuración
1. Completa todos los campos del formulario
2. Haz clic en "Guardar Configuración"
3. Haz clic en "Probar Conexión"

### 5.3 Verificar Resultados
Si la conexión es exitosa, verás:
- ✅ Badge verde "Conectado"
- 📊 Métricas de datos guardados
- 🎉 Mensaje de confirmación

### 5.4 Probar en la aplicación principal
1. Ve a: http://localhost:3000/
2. Navega por las diferentes pestañas
3. Intenta crear, editar o eliminar datos
4. Verifica que los datos se guardan correctamente

---

## 🚨 Paso 6: Solución de Problemas Comunes

### 6.1 Error: "Permission denied"
**Causa**: Reglas de seguridad de Firestore demasiado restrictivas
**Solución**:
1. Ve a Firebase Console → Firestore Database → Reglas
2. Cambia temporalmente las reglas a:
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
3. Haz clic en "Publicar"

### 6.2 Error: "Invalid API Key"
**Causa**: Credencial incorrecta o mal formateada
**Solución**:
1. Verifica que hayas copiado la API Key correctamente
2. Asegúrate de no incluir espacios adicionales
3. Verifica que el archivo `.env.local` esté en la raíz del proyecto

### 6.3 Error: "Network Error"
**Causa**: Problemas de conexión a internet o bloqueo de Firebase
**Solución**:
1. Verifica tu conexión a internet
2. Asegúrate de que Firebase no esté bloqueado en tu red
3. Prueba acceder a Firebase Console desde tu navegador

### 6.4 Error: "Module not found"
**Causa**: Dependencias de Firebase no instaladas
**Solución**:
1. Instala las dependencias de Firebase:
   ```bash
   npm install firebase
   ```
2. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### 6.5 Error: "Failed to initialize Firebase"
**Causa**: Problemas con la inicialización de Firebase
**Solución**:
1. Verifica que todas las credenciales estén completas
2. Asegúrate de que el proyecto de Firebase exista
3. Verifica que Firestore Database esté habilitado

---

## 🎯 Paso 7: Verificación Final

### 7.1 Checklist de Verificación
- [ ] Proyecto creado en Firebase Console
- [ ] Firestore Database habilitado
- [ ] Credenciales obtenidas correctamente
- [ ] Archivo `.env.local` creado con credenciales
- [ ] Conexión a Firebase probada exitosamente
- [ ] Datos guardados correctamente en Firestore
- [ ] CRUD operations funcionando correctamente

### 7.2 Pruebas Funcionales
1. **Crear un producto**:
   - Ve a la pestaña "Productos"
   - Haz clic en "Añadir Producto"
   - Completa el formulario
   - Verifica que se guarde correctamente

2. **Editar un producto**:
   - Haz clic en el icono de edición
   - Modifica algún campo
   - Guarda los cambios
   - Verifica que se actualice correctamente

3. **Eliminar un producto**:
   - Haz clic en el icono de eliminación
   - Confirma la eliminación
   - Verifica que se elimine correctamente

4. **Probar reportes**:
   - Ve a la pestaña "Reportes"
   - Verifica que los datos se carguen correctamente
   - Prueba los filtros y gráficos

### 7.3 Pruebas Técnicas
1. **Recargar la página**:
   - Los datos deben persistir
   - No debe haber pérdida de información

2. **Probar diferentes navegadores**:
   - Chrome, Firefox, Safari
   - La aplicación debe funcionar correctamente

3. **Probar dispositivos móviles**:
   - Abre la aplicación en un dispositivo móvil
   - Verifica que el diseño sea responsive

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

### Tutoriales y Guías
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

### Comunidad y Soporte
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- [Firebase Discord Server](https://discord.gg/firebase)

---

## 🎉 ¡Felicidades!

Has completado la configuración de Firebase para tu **Galaxy Restaurant System**. Ahora tienes:

✅ **Conexión a Firebase completamente funcional**
✅ **Base de datos Firestore operativa**
✅ **Sincronización en tiempo real**
✅ **Persistencia de datos**
✅ **CRUD operations funcionales**
✅ **Interfaz de usuario completa**

### Próximos Pasos Opcionales
1. Implementar Firebase Authentication
2. Añadir Firebase Storage para imágenes
3. Implementar Firebase Functions para backend
4. Añadir Firebase Analytics
5. Implementar Firebase Cloud Messaging

---

**🤖 Generated with [Claude Code](https://claude.ai/code)**

**Co-Authored-By: Claude <noreply@anthropic.com>**