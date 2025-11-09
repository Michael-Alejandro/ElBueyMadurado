# 🚀 Guía de Despliegue - El Buey Madurado

Este documento explica cómo desplegar el sitio web de El Buey Madurado en **Vercel** con el dominio personalizado **ElBueyMadurado.com**.

## 📋 Requisitos Previos

1. **Cuenta de GitHub** - Para conectar el repositorio
2. **Cuenta de Vercel** - Deploy gratuito y automático
3. **Dominio ElBueyMadurado.com** - Registrado (GoDaddy, Namecheap, etc.)
4. **Node.js 18+** - Para desarrollo local

## 🔧 Paso 1: Preparar el Repositorio

### En tu máquina local:
```bash
# Inicializar git si aún no lo has hecho
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: El Buey Madurado React website"

# Conectar con repositorio remoto en GitHub
git remote add origin https://github.com/tu-usuario/ElBueyMadurado.git
git branch -M main
git push -u origin main
```

## 🌐 Paso 2: Conectar con Vercel

### A. Crear Proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en **"New Project"**
3. Selecciona **"Import Git Repository"**
4. Conecta tu cuenta de GitHub
5. Selecciona el repositorio `ElBueyMadurado`
6. Click en **Import**

### B. Configurar el Proyecto

En la pantalla de configuración:

```
Framework: Other (Vite will be detected automatically)
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Vercel auto-detectará que es un proyecto Vite y aplicará la configuración correcta.**

### C. Environment Variables (si aplica en futuro)

Si agregabas variables de entorno (API keys, etc.):
1. Ve a **Settings** → **Environment Variables**
2. Agrega cada variable
3. Las variables están disponibles durante build y runtime

### D. Deploy

1. Click en **Deploy**
2. Vercel construirá y desplegará automáticamente
3. Tu sitio estará disponible en: `https://el-buey-madurado-xyz.vercel.app`

## 🏠 Paso 3: Conectar Dominio Personalizado

### Opción A: Transferir DNS a Vercel (Recomendado)

1. En Vercel, ve a **Settings** → **Domains**
2. Ingresa tu dominio: `elbueymadurado.com`
3. Vercel te mostrará los **Nameservers**:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`

4. Ve a tu proveedor de dominio (GoDaddy, Namecheap, etc.)
5. Reemplaza los Nameservers por los de Vercel
6. Espera 24-48 horas para propagación DNS
7. ¡Listo! El dominio estará conectado

### Opción B: Usar CNAME Record (Si quieres mantener tu DNS actual)

1. En Vercel: **Settings** → **Domains** → Agrega como CNAME
2. En tu proveedor DNS, crea un record:
   ```
   Tipo: CNAME
   Nombre: www
   Valor: cname.vercel-dns.com
   ```
3. Vercel proporcionará el valor exacto

## 🔄 Paso 4: Configurar Despliegue Automático

Vercel despliega automáticamente:
- Cada vez que haces `git push` a `main`
- Crea previsualizaciones automáticas para Pull Requests
- Mantiene historial completo de deployments

### Ver Logs de Deployment

1. Ve a tu proyecto en Vercel
2. Click en **Deployments**
3. Selecciona el deployment para ver logs detallados

## 🚀 Paso 5: Verificar Producción

```bash
# Verificar que todo build correctamente en local
npm run build

# Ver preview local del build
npm run preview

# Verificar que la app está funcionando en Vercel
# Abre https://elbueymadurado.com en navegador
```

## 📊 Monitoreo y Mantenimiento

### Analíticas en Vercel
- **Requests**: Ver tráfico en tiempo real
- **Performance**: Métricas de Core Web Vitals
- **Errors**: Errores de aplicación y servidor

### Actualizar el Sitio

```bash
# Hacer cambios localmente
# Por ejemplo, actualizar precios en la carta

# Commit y push
git add .
git commit -m "Update menu prices"
git push origin main

# Vercel desplegará automáticamente en 1-2 minutos
```

## 🛠️ Solucionar Problemas

### El sitio tarda en cargar
- **Causa:** Imagen hero es grande (1MB)
- **Solución:** Comprimir imagen con TinyPNG o ImageOptim

### El dominio no funciona después de 48 horas
- **Causa:** Propagación DNS lenta
- **Solución:**
  - Limpiar cache DNS: `ipconfig /flushdns` (Windows) o `sudo dscacheutil -flushcache` (Mac)
  - Esperar más tiempo (puede tardar hasta 72 horas)

### Deploy falla con error de build
- **Causa:** Dependencias no instaladas
- **Solución:** Verifica `package.json` y ejecuta `npm install` localmente

### Las imágenes no se ven en producción
- **Causa:** Rutas de importación incorrectas
- **Solución:** Asegúrate que las imágenes están en carpeta `/img` y se importan correctamente:
  ```javascript
  import logo from "../../img/logo.jpeg";
  ```

## 🔐 Seguridad

### Headers de Seguridad
Vercel automáticamente agrega:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

### HTTPS
✅ Automático y obligatorio en todos los proyectos de Vercel

### Backups
- Vercel mantiene historial de todos los deployments
- Puedes revertir a versiones anteriores en 1 click

## 📈 Rendimiento

### Core Web Vitals (Vercel Analytics)
Objetivo:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimizaciones Aplicadas
✅ Imágenes optimizadas y comprimidas
✅ Code splitting automático
✅ Caching de assets inteligente
✅ Compresión gzip en todos los archivos
✅ CSS y JavaScript minificados

## 📞 Soporte

Si tienes problemas:
1. **Vercel Docs:** https://vercel.com/docs
2. **Vercel Support:** support@vercel.com
3. **GitHub Issues:** Documentar errores aquí

## 📋 Checklist Pre-Lanzamiento

- [ ] El sitio carga correctamente en local: `npm run dev`
- [ ] El build no tiene errores: `npm run build`
- [ ] Las imágenes se ven correctamente
- [ ] Todos los links funcionan
- [ ] El formulario de contacto funciona
- [ ] El mapa de Google se carga
- [ ] Responsive en móvil, tablet y desktop
- [ ] Los enlaces en navbar van a las páginas correctas
- [ ] El footer tiene el copyright correcto
- [ ] Las animaciones son suaves y no ralentizan
- [ ] El SEO está optimizado (títulos, descripciones)
- [ ] Dominio conectado en Vercel
- [ ] HTTPS funciona correctamente
- [ ] Analytics configurada

## 🎉 ¡Listo!

Tu sitio de El Buey Madurado está ahora en producción y accesible en:

🌐 **https://elbueymadurado.com**

Cualquier cambio que hagas en el código se desplegará automáticamente.

---

**Última actualización:** Noviembre 2024
**Próxima revisión:** Mensual
