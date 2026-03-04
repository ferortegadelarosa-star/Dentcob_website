# 🦷 Dentcob — Landing Page Premium

> **Sonríe sin complejos, tu clínica dental de confianza.**

Landing page profesional para la clínica dental Dentcob con diseño Swiss-Clean, animaciones premium y estructura responsive completa.

---

## 🎨 Paleta de Colores

| Rol | Color | HEX |
|-----|-------|-----|
| **Primario** | Azul Dentcob | `#0b56a1` |
| **Acento** | Verde detalles | `#00ff8b` |
| **Fondo principal** | Blanco puro | `#FFFFFF` |
| **Fondo secundario** | Gris claro | `#F8FAFB` |
| **Fondo oscuro** (footer/CTA) | Azul oscuro | `#0A1628` |
| **Texto principal** | Negro azulado | `#0A1628` |
| **Texto secundario** | Gris medio | `#3A4A5C` |

---

## 📸 Imágenes — Guía de Reemplazo

Todas las imágenes están preparadas con **placeholders** para que las reemplaces fácilmente con tus fotos reales.

### Para reemplazar una imagen:

1. **Coloca tus fotos** en la carpeta `images/`
2. **Busca en `index.html`** la línea comentada con `<!-- <img src="images/...` 
3. **Descomenta** la línea `<img>` y **comenta/elimina** el `<div class="image-placeholder">`

### Lista de imágenes a añadir:

| Archivo | Uso | Tamaño recomendado |
|---------|-----|---------------------|
| `images/logo.png` | Navbar y favicon | 200x60px |
| `images/hero_visual.jpg` | Hero principal | 800x1000px (portrait) |
| `images/service_1.jpg` | Estética Dental | 600x760px |
| `images/service_2.jpg` | Endodoncias | 600x760px |
| `images/service_3.jpg` | Cirugía Oral | 600x760px |
| `images/service_4.jpg` | Implantología | 600x760px |
| `images/service_5.jpg` | Limpiezas | 600x760px |
| `images/service_6.jpg` | Ortodoncia | 600x760px |
| `images/service_7.jpg` | Prótesis y Reconstrucción | 600x760px |
| `images/about_image.jpg` | Foto clínica/equipo | 800x600px |

### Ejemplo de reemplazo (Hero):

**Antes (placeholder):**
```html
<!-- <img src="images/hero_visual.jpg" alt="Dentcob Clínica Dental"> -->
<div class="image-placeholder">...</div>
```

**Después (con imagen real):**
```html
<img src="images/hero_visual.jpg" alt="Dentcob Clínica Dental">
<!-- <div class="image-placeholder">...</div> -->
```

---

## 📁 Estructura del Proyecto

```
prototipo web dentcob/
├── index.html          # Página principal
├── styles.css          # Todos los estilos
├── script.js           # Animaciones e interacciones
├── README.md           # Este archivo
└── images/             # Carpeta para tus imágenes
    ├── logo.png
    ├── hero_visual.jpg
    ├── service_1.jpg
    ├── service_2.jpg
    ├── service_3.jpg
    ├── service_4.jpg
    ├── service_5.jpg
    ├── service_6.jpg
    ├── service_7.jpg
    └── about_image.jpg
```

---

## ✨ Características

- ✅ **Diseño Swiss-Clean** — Tipografía fuerte, grid limpio, jerarquía clara
- ✅ **7 Flip Cards de Servicios** — Hover para voltear en desktop, tap en mobile
- ✅ **Navbar sticky** con blur al scroll
- ✅ **Partículas animadas** en el hero
- ✅ **Contadores animados** para estadísticas
- ✅ **Scroll reveal** con Intersection Observer
- ✅ **100% Responsive** — Desktop, tablet y mobile
- ✅ **Menú hamburguesa** para mobile
- ✅ **Smooth scroll** en todos los enlaces
- ✅ **Sección CTA** con glow effects
- ✅ **Footer completo** con links y redes sociales

---

## 🛠️ Personalización Rápida

### Cambiar colores
Edita las variables CSS en `styles.css` (líneas 10-30):
```css
--primary-500: #0b56a1;  /* Tu azul principal */
--accent-500:  #00ff8b;  /* Tu verde de acento */
```

### Cambiar textos
Edita directamente en `index.html`. Todo el contenido es HTML plano, sin frameworks.

### Cambiar teléfono y datos de contacto
Busca `+34 633 118 705` y `info@dentcob.com` en `index.html` y reemplázalos.

---

## 🚀 Cómo usar

1. Abre `index.html` en tu navegador
2. O súbelos a cualquier hosting estático (Netlify, Vercel, GitHub Pages, etc.)

No requiere node, npm, ni ningún build step. Es HTML/CSS/JS puro.

---

## 📝 Tipografía

- **Títulos:** Plus Jakarta Sans (Google Fonts) — Weight 700-800
- **Cuerpo:** Inter (Google Fonts) — Weight 400-500

---

© 2026 Dentcob. Landing page creada con diseño Swiss-Clean premium.
